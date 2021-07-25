import { NgZone } from '@angular/core';
import { Location as AngularLocation } from '@angular/common';
import { NavigationEnd, Router as AngularRouter } from '@angular/router';
import { ReactNode, useCallback, useState } from 'react';
import { Location, State, parsePath, createPath, To } from 'history';
import { Router, Navigator } from 'react-router';
import useConstant from 'use-constant';
import { useSubscription } from 'observable-hooks';
import { range } from 'lodash';
import { useAngularInjector } from './AngularInjector';

const AngularReactRouterKey = 'angular-react-router-key';

/**
 * 实现了 React Router 的 Router API，其下层实现是 Angular 的 Router
 */
export const AngularRouter2ReactRouter = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const injector = useAngularInjector();
  const ngZone = injector.get(NgZone);
  const angularRouter = injector.get(AngularRouter);
  const angularLocation = injector.get(AngularLocation);

  const getLocation = useCallback((): {
    readonly location: Location<State>;
  } => {
    const path = parsePath(angularLocation.path());

    return {
      location: {
        key: AngularReactRouterKey,
        state: angularRouter.getCurrentNavigation()?.extras.state as any,
        search: path.search ?? '',
        hash: path.hash ?? '',
        pathname: path.pathname ?? '',
      },
    };
  }, []);
  const [state, setState] = useState(getLocation);

  useSubscription(angularRouter.events, event => {
    if (!(event instanceof NavigationEnd)) {
      return;
    }
    ngZone.runOutsideAngular(() => {
      setState(getLocation);
    });
  });

  const navigator: Navigator = useConstant(() => {
    const getHref = (to: To) => (typeof to === 'string' ? to : createPath(to));

    return {
      createHref: to => '#' + getHref(to),
      push: (to, state: any) => {
        ngZone.run(() => {
          angularRouter
            .navigateByUrl(getHref(to), {
              replaceUrl: false,
              state,
            })
            .then(() => {
              ngZone.runOutsideAngular(() => {
                setState(getLocation);
              });
            });
        });
      },
      replace: (to, state: any) => {
        ngZone.run(() => {
          angularRouter
            .navigateByUrl(getHref(to), {
              replaceUrl: true,
              state,
            })
            .then(() => {
              ngZone.runOutsideAngular(() => {
                setState(getLocation);
              });
            });
        });
      },
      block: blocker => () => {
        console.error('暂时不支持 blocker');
      },
      go: delta => {
        ngZone.run(() => {
          if (delta < 0) {
            range(-delta).forEach(() => {
              angularLocation.back();
            });
          } else if (delta > 0) {
            range(delta).forEach(() => {
              angularLocation.forward();
            });
          }
          ngZone.runOutsideAngular(() => {
            setState(getLocation);
          });
        });
      },
    };
  });

  return (
    <Router location={state.location} navigator={navigator}>
      {children}
    </Router>
  );
};

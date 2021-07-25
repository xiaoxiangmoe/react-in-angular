import type { Injector } from '@angular/core';
import { RoutesRootComponent } from '../routes/routes';
import { AngularInjectorContext } from './AngularInjector';

export const getAngularReactRoot = ({ injector }: { injector: Injector }) => (
  <AngularInjectorContext.Provider value={injector}>
    <RoutesRootComponent />
  </AngularInjectorContext.Provider>
);

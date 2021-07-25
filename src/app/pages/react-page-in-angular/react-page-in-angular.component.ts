import {
  ChangeDetectionStrategy,
  Injector,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ReactDOM from 'react-dom';
import { getAngularReactRoot } from '../../../react/angular-lib/AngularReactRoot';

@Component({
  selector: 'app-react-page-in-angular',
  template: `
    <p>react-page-in-angular works!</p>
    <div #root></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactPageInAngularComponent implements OnInit, OnDestroy {
  constructor(
    private readonly injector: Injector,
    private readonly ngZone: NgZone
  ) {}

  @ViewChild('root', { static: true })
  private readonly root!: ElementRef<HTMLElement>;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      ReactDOM.render(
        getAngularReactRoot({ injector: this.injector }),
        this.root.nativeElement
      );
    });
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.root.nativeElement);
  }
}

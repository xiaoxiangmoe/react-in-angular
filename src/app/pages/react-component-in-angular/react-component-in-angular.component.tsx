import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as ReactDOM from 'react-dom';
import { CountButton } from '../../../react/components/CountButton';
import { ConfigProvider } from 'antd';

@Component({
  selector: 'app-react-component-in-angular',
  template: `
    <div>react-component-in-angular works!</div>
    <div>
      Angular 中的状态 color 是
      <span style="color: {{ color$ | async }}">{{ color$ | async }}</span>
    </div>
    <div>
      从 React 回调函数同步过来的 count 是
      {{ count === undefined ? 'undefined' : count }}
    </div>
    <button (click)="color$.next('red')">red</button>
    <button (click)="color$.next('blue')">blue</button>
    <div #root></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactComponentInAngularComponent implements OnInit, OnDestroy {
  constructor(
    private readonly ngZone: NgZone,
    private readonly cd: ChangeDetectorRef
  ) {}

  /**
   * Angular 中的状态，通过 Props 传递到 React
   */
  readonly color$ = new BehaviorSubject('red');

  @ViewChild('root', { static: true })
  private readonly root!: ElementRef<HTMLElement>;
  private readonly destroyed$ = new Subject<void>();

  /**
   * react 同步过来的状态
   */
  private count: undefined | number;

  ngOnInit() {
    combineLatest([this.color$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([color]) => {
        this.ngZone.runOutsideAngular(() => {
          ReactDOM.render(
            <ConfigProvider prefixCls="antd">
              <CountButton
                color={color}
                onSyncCount={count => {
                  this.count = count;
                  this.cd.detectChanges(); // 触发 Angular 变更检查，更新页面

                  // 如果 changeDetection 是 ChangeDetectionStrategy.Default
                  // 则可以用下面的方法
                  // this.ngZone.run(() => { this.count = count; });
                }}
              />
            </ConfigProvider>,
            this.root.nativeElement
          );
        });
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    ReactDOM.unmountComponentAtNode(this.root.nativeElement);
  }
}

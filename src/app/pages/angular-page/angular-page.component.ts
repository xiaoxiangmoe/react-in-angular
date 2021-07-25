import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-angular-page',
  templateUrl: './angular-page.component.html',
  styleUrls: ['./angular-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

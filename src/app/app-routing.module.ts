import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularPageComponent } from './pages/angular-page/angular-page.component';
import { ReactComponentInAngularComponent } from './pages/react-component-in-angular/react-component-in-angular.component';

const routes: Routes = [
  {
    component: AngularPageComponent,
    path: 'angular-page',
  },
  {
    component: ReactComponentInAngularComponent,
    path: 'react-component-in-angular',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

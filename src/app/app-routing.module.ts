import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularPageComponent } from './pages/angular-page/angular-page.component';
import { ReactComponentInAngularComponent } from './pages/react-component-in-angular/react-component-in-angular.component';
import { ReactPageInAngularComponent } from './pages/react-page-in-angular/react-page-in-angular.component';

const routes: Routes = [
  {
    component: AngularPageComponent,
    path: 'angular-page',
  },
  {
    component: ReactComponentInAngularComponent,
    path: 'react-component-in-angular',
  },
  {
    path: 'react-page-in-angular',
    children: [{ path: '**', component: ReactPageInAngularComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

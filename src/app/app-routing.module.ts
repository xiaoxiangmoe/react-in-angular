import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularPageComponent } from './pages/angular-page/angular-page.component';

const routes: Routes = [
  {
    component: AngularPageComponent,
    path: 'angular-page',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

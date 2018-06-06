import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from './config/pages-config';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: pages.customerManagement.path
  },
  {
    path: pages.customerManagement.path,
    loadChildren: pages.customerManagement.loadChildren
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

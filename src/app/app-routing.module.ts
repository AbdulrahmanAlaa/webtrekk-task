import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from './config/pages-config';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
/**
 * holds application routes for lazy loading modules
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: pages.customerManagement.path
  },
  {
    path: pages.customerManagement.path,
    loadChildren: pages.customerManagement.loadChildren
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

/**
 * the App Route decorator that contains needed modules and routs 
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

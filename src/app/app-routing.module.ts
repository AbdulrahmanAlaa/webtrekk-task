import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from './config/pages-config';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';
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
    loadChildren: 'src/app/customer-management/customer-management.module#CustomerManagementModule',
    canActivate: [AuthenticatedGuard],
    canLoad: [AuthenticatedGuard]
  },
  {
    path: '',
    loadChildren: 'src/app/auth/auth.module#AuthModule'
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

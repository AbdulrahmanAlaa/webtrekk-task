import { pages } from './../config/pages-config';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  {
    path: pages.auth.login.path,
    component: LoginComponent
  },
  {
    path: pages.auth.register.path,
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

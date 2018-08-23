import { pages } from './../config/pages-config';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  {
    path: pages.auth.login.path,
    component: LoginComponent
  },
  {
    path: pages.auth.register.path,
    component: RegisterComponent
  },
  {
    path: pages.auth.social.facebook.path,
    component: SocialComponent
  },
  {
    path: pages.auth.social.google.path,
    component: SocialComponent
  },
  {
    path: pages.auth.social.twitter.path,
    component: SocialComponent
  },
  {
    path: pages.auth.social.linkedin.path,
    component: SocialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

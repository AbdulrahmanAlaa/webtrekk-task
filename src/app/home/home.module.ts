import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [NavbarComponent, PageNotFoundComponent],
  exports: [NavbarComponent, PageNotFoundComponent]
})
/**
 * the Home Module decorator that contains reusable Components Pipes Services Guards ....
 */
export class HomeModule { }

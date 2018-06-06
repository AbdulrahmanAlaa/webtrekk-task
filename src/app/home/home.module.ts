import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    BsDropdownModule.forRoot()    
  ],
  declarations: [NavbarComponent],
  exports:[NavbarComponent]
})
export class HomeModule { }

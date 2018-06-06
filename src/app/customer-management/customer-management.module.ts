import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoContentComponent } from './no-content/no-content.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),  
    BsDatepickerModule.forRoot(),  
    TranslateModule,
    CommonModule,
    CustomerManagementRoutingModule
  ],
  declarations: [ListComponent, EditComponent, AddComponent, NoContentComponent]
})
export class CustomerManagementModule { }

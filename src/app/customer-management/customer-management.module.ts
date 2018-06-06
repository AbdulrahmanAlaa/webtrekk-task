import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    CustomerManagementRoutingModule
  ],
  declarations: [ListComponent]
})
export class CustomerManagementModule { }

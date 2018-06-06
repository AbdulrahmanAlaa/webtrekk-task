import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from '../config/pages-config';
import { AddEditComponent } from './add/add-edit.component';

const routes: Routes = [
  {
    path:pages.customerManagement.children.list.path,
    component:ListComponent
  },
  {
    path:pages.customerManagement.children.add.path,
    component:AddEditComponent
  },
  {
    path:pages.customerManagement.children.edit.path,
    component:AddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }

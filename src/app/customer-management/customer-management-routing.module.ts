import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pages } from '../config/pages-config';
import { AddEditComponent } from './add-edit/add-edit.component';

/**
 * the Customer Routing Module routes that contains needed all module CRUD operations routs
 */
const routes: Routes = [
  {
    path: pages.customerManagement.children.list.path,
    component: ListComponent
  },
  {
    path: pages.customerManagement.children.add.path,
    component: AddEditComponent
  },
  {
    path: pages.customerManagement.children.delete.path,
    component: DetailsComponent
  },
  {
    path: pages.customerManagement.children.edit.path,
    component: AddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }

import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { pages } from '../config/pages-config';

const routes: Routes = [
  {
    path:pages.customerManagement.children.list.path,
    component:ListComponent
  },
  {
    path:pages.customerManagement.children.add.path,
    component:AddComponent
  },
  {
    path:pages.customerManagement.children.edit.path,
    component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }

import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public customers = [];
  constructor(
    private customersService: CustomersService
  ) { }

  ngOnInit() {
    this.updateCustomersList();
  }

  removeCustomer(customer: Customer) {
    this.customersService.deleteCustomer(customer.customerID).subscribe(() => {
      this.updateCustomersList();
    })
  }

  updateCustomersList() {
    this.customersService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
    });
  }

}

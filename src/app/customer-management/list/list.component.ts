import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /** holds all the customer in the system */
  public customers = null;

  /*************  Life Cycle Hooks  ***********/
  /**
  * parameters passed by angular Dependency Injection
  * @param customersService  contains the CRUD operation to handle customers data
  */
  constructor(
    private customersService: CustomersService
  ) { }

  ngOnInit() {
    this.updateCustomersList();
  }


  // -------------------------------
  //     Public Functions
  // -------------------------------

  /**
   * Get All Customer to be displayed
   */
  public updateCustomersList() {
    this.customersService.getCustomers().subscribe((customers: Array<Customer>) => {
      this.customers = customers;
    });
  }

}

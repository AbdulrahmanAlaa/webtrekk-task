import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CUSTOMERS_DATA } from '../config/defines';
import { Customer } from '../shared/interfaces/customer.interface';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customerData = CUSTOMERS_DATA;
  constructor(private httpClient: HttpClient) {
  }

  getCustomers(): Observable<Array<Customer>> {
    return of(this.customerData);
  }

  deleteCustomer(customerId: number) {
    const customer = this.customerData.indexOf(this.customerData.filter((customer) => customer.customerID == customerId)[0]);
    this.customerData.splice(customer, 1)
    return of(customerId);
  }

  updateCustomer() {

  }

  addCustomer(data) {
    let maxId = 0;
    // Get Max Id
    this.customerData.forEach(customer => {
      if (customer.customerID > maxId) {
        maxId = customer.customerID
      }
    })
    const customer = {} as Customer;
    customer.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
    customer.gender = data.gender;
    customer.lastContact = '';
    customer.name = { first: data.fname, last: data.lname };
    customer.customerID = ++maxId;

    this.customerData.push(customer);
    return of(customer);
  }
}

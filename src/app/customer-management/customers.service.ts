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

  /** holds all customers when the app loads */
  private customerData = CUSTOMERS_DATA;

    /*************  Life Cycle Hooks  ***********/
  /**
   * parameters passed by angular Dependecy Injection 
   * @param httpClient Help creating ajax calls to backend
   */
  constructor(private httpClient: HttpClient) {
  }

  //-------------------------------
  //     Public Functions
  //-------------------------------

  /**
   * Get All customers 
   */
  public getCustomers(): Observable<Array<Customer>> {
    return of(this.customerData);
  }

  /**
   * Get Single Customer using customer id 
   * @param id {number} Customer Id 
   */
  public getByCustomerID(id: number): Observable<any> {
    return of(this.customerData.find(customer => customer.customerID === id));
  }

  /**
   * Delete Customer using his CustomerId
   * @param customerId {number} customer identifier
   */
  public deleteCustomer(customerId: number) {
    const customer = this.customerData.indexOf(this.customerData.filter((customer) => customer.customerID == customerId)[0]);
    this.customerData.splice(customer, 1)
    return of(customerId);
  }

  /**
   * Update Customer Information
   * @param data {any} Customer data
   * @param id {number} customer identifier
   */
  public updateCustomer(data, id: number) {
    const customer = this.customerData.find((customer) => customer.customerID == id);
    if (customer) {
      customer.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
      customer.name = { first: data.fname, last: data.lname };
      customer.gender = data.gender;
    }
    return of(customer);
  }

  /**
   * Add Customer to all customers source or remote DB
   * @param data {any} Customer data
   */
  public addCustomer(data) {
    let maxId = 0;
    // Get Max Id
    this.customerData.forEach(customer => {
      if (customer.customerID > maxId) {
        maxId = customer.customerID
      }
    });

    // Create customer object in order to add it to the source list
    const customer = {} as Customer;
    customer.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
    customer.gender = data.gender;
    customer.lastContact = '';
    customer.name = { first: data.fname, last: data.lname };
    customer.customerID = ++maxId; // Work around to simulate backend id generating

    this.customerData.push(customer);
    return of(customer);
  }
}

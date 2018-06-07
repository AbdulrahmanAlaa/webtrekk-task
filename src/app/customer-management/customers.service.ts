import { API_ROUTES } from './../config/api-route';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CUSTOMERS_DATA } from '../config/defines';
import { Customer } from '../shared/interfaces/customer.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public getCustomers(): Observable<any> {
    return this.httpClient.get(API_ROUTES.GET_CUSTOMERS).pipe(map(response => this.handleResponse(response)));
  }

  /**
   * Get Single Customer using customer id 
   * @param id {number} Customer Id 
   */
  public getByCustomerID(id: number): Observable<any> {
    return this.httpClient.get(API_ROUTES.GET_CUSTOMER_BY_ID(id)).pipe(map(response => this.handleResponse(response)));;
  }

  /**
   * Delete Customer using his CustomerId
   * @param customerId {number} customer identifier
   */
  public deleteCustomer(customerId: number) {
    return this.httpClient.delete(API_ROUTES.DELETE_CUSTOMER_BY_ID(customerId)).pipe(map(response => this.handleResponse(response)));;
  }

  /**
   * Update Customer Information
   * @param data {any} Customer data
   * @param id {number} customer identifier
   */
  public updateCustomer(data, id: number) {
    const customer = {} as Customer;
    customer.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
    customer.gender = data.gender;
    customer.lastContact = '';
    customer.name = { first: data.fname, last: data.lname };
    if (data) {
      customer.customerID = id;
    }
    return this.httpClient.put(API_ROUTES.UPDATE_CUSTOMER, customer).pipe(map(response => this.handleResponse(response)));;
  }

  /**
   * Add Customer to all customers source or remote DB
   * @param data {any} Customer data
   */
  public addCustomer(data) {
    // Create customer object in order to add it to the source list
    const customer = {} as Customer;
    customer.birthday = moment(data.birthday as Date).format('YYYY-MM-DD');
    customer.gender = data.gender;
    customer.lastContact = '';
    customer.name = { first: data.fname, last: data.lname };
    return this.httpClient.post(API_ROUTES.CREATE_CUSTOMER, customer).pipe(map(response => this.handleResponse(response)));;
  }
  private handleResponse(response: any) {
    return response.data;
  }
}

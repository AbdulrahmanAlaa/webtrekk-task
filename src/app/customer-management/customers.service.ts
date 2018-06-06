import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CUSTOMERS_DATA } from '../config/defines';
import { Customer } from '../shared/interfaces/customer.interface';
import { of, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) {
  }

  getCustomers(): Observable<Array<Customer>> {
    return of(CUSTOMERS_DATA);
  }

  deleteCustomer(customerId:number) {
    return of(customerId);
  }

  updateCustomer() {

  }
}

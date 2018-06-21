import { Customer } from './../shared/interfaces/customer.interface';
import { API_ROUTES } from './../config/api-route';
import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomersService', () => {
  let injector: TestBed;
  let service: CustomersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CustomersService]
    });
    injector = getTestBed();
    service = injector.get(CustomersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([CustomersService], (customersService: CustomersService) => {
    expect(customersService).toBeTruthy();
  }));

  it('should Get customers from DB', () => {

    // Mocking the Customers Array
    const dummyCustomers: { data: Array<Customer> } = {
      data: [
        {
          name:
          {
            first: 'John',
            last: 'Doe'
          },
          lastContact: '',
          gender: 'm',
          customerLifetimeValue: 0,
          customerID: 1,
          birthday: '1992-1-2'
        },
        {
          name:
          {
            first: 'Abdulrahman',
            last: 'Alaa'
          },
          lastContact: '',
          gender: 'm',
          customerLifetimeValue: 0,
          customerID: 1,
          birthday: '1992-1-2'
        },
      ]
    };

    service.getCustomers().subscribe(customers => {
      expect(customers.length).toBe(2);
      expect(customers).toEqual(dummyCustomers.data);
    });

    const req = httpMock.expectOne(API_ROUTES.GET_CUSTOMERS);
    req.flush(dummyCustomers);
    expect(req.request.method).toBe('GET');
  });

  it('should GetSingle customer from DB', () => {

    // Mocking the Customers Array
    const dummyCustomers: { data: Customer } = {
      data:
      {
        name: {
          first: 'John',
          last: 'Doe'
        },
        lastContact: '',
        gender: 'm',
        customerLifetimeValue: 0,
        customerID: 1,
        birthday: '1992-1-2'
      }
    };

    service.getByCustomerID(1).subscribe((customer: Customer) => {
      expect(customer.customerID).toEqual(1);
    });

    const req = httpMock.expectOne(API_ROUTES.GET_CUSTOMER_BY_ID(1));
    req.flush(dummyCustomers);
    expect(req.request.method).toBe('GET');
  });

  it('should Add customer To DB', () => {

    // Mocking the Customers Array
    const dummyCustomers: { data: Customer } = {
      data:
      {
        name: {
          first: 'John',
          last: 'Doe'
        },
        lastContact: '',
        gender: 'm',
        customerLifetimeValue: 0,
        customerID: 1,
        birthday: '1992-1-2'
      }
    };

    service.addCustomer({
      'fname': 'Ahmed',
      'lname': 'Ali',
      'birthday': new Date(),
      'gender': 'm'
    }).subscribe((customer: Customer) => {
      expect(customer.customerID).toEqual(1);
    });

    const req = httpMock.expectOne(API_ROUTES.CREATE_CUSTOMER);
    req.flush(dummyCustomers);
    expect(req.request.method).toBe('POST');
  });

  it('should Delete customer from DB', () => {

    // Mocking the Customers Array
    const dummyCustomers: { data: Customer } = {
      data:
      {
        name: {
          first: 'John',
          last: 'Doe'
        },
        lastContact: '',
        gender: 'm',
        customerLifetimeValue: 0,
        customerID: 1,
        birthday: '1992-1-2'
      }
    };

    service.deleteCustomer(1).subscribe((customer: Customer) => {
      expect(customer.customerID).toEqual(1);
    });

    const req = httpMock.expectOne(API_ROUTES.DELETE_CUSTOMER_BY_ID(1));
    req.flush(dummyCustomers);
    expect(req.request.method).toBe('DELETE');
  });

  it('should Update customer in DB', () => {

    // Mocking the Customers Array
    const dummyCustomers: { data: Customer } = {
      data:
      {
        name: {
          first: 'John',
          last: 'Doe'
        },
        lastContact: '',
        gender: 'm',
        customerLifetimeValue: 0,
        customerID: 1,
        birthday: '1992-1-2'
      }
    };

    service.updateCustomer({
      'fname': 'Ahmed',
      'lname': 'Ali' ,
      'birthday': new Date(),
      'gender': 'm'
    }, 1).subscribe((customer: Customer) => {
      expect(customer.customerID).toEqual(1);
    });

    const req = httpMock.expectOne(API_ROUTES.UPDATE_CUSTOMER);
    req.flush(dummyCustomers);
    expect(req.request.method).toBe('PUT');
  });

});

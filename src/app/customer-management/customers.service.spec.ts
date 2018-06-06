import { TestBed, inject } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CustomersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [CustomersService]
    });
  });

  it('should be created', inject([CustomersService], (service: CustomersService) => {
    expect(service).toBeTruthy();
  }));
});

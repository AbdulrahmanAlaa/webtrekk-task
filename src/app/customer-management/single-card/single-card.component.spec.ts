import { Customer } from './../../shared/interfaces/customer.interface';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardComponent } from './single-card.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { CustomersServiceMock } from '../../tests/mocks/services/customer.service';
import { CustomersService } from '../customers.service';

describe('SingleCardComponent', () => {
  let component: SingleCardComponent;
  let fixture: ComponentFixture<SingleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        TooltipModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [SingleCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCardComponent);
    component = fixture.componentInstance;
    component.customer = {
      birthday: '1992-12-12',
      customerID: 1000,
      customerLifetimeValue: 10000,
      gender: 'm',
      lastContact: '',
      name: { first: 'fName', last: 'lName' }
    } as Customer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

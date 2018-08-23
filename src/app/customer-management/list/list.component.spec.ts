import { NoContentComponent } from './../no-content/no-content.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SingleCardComponent } from '../single-card/single-card.component';
import { CustomersService } from '../customers.service';
import { CustomersServiceMock } from '../../tests/mocks/services/customer.service';

xdescribe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CustomersService,
          useClass: CustomersServiceMock
        }
      ],
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
      declarations: [NoContentComponent, ListComponent, SingleCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { pages } from './../../config/pages-config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Subscription } from 'rxjs';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private sub: Subscription = null;
  public customer: Customer;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.sub = this.customerService.getByCustomerID(+params['id']).subscribe(customer => {
        if (customer) {
          this.customer = customer;
        }
        console.log('edit', customer);
      });
    });
  }

  removeCustomer() {
    this.customerService.deleteCustomer(this.customer.customerID).subscribe(() => {
      this.router.navigate([pages.customerManagement.path]);
    })
  }
}

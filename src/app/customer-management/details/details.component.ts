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
  /** holds the subscription intfo in order to be deleted to clear the memory */
  private sub: Subscription = null;
  
  /** holds current customer data */
  public customer: Customer;


  /*************  Life Cycle Hooks  ***********/
  /**
* parameters passed by angular Dependency Injection 
* @param customersService  contains the CRUD operation to handle customers data 
* @param route  contains current active route data and paramenters
* @param router  Helps and navigating between routes 
*/
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService,
    private router: Router
  ) { }

  ngOnInit() {
    // Find the Cusomer ID from URL segment
    this.route.params.subscribe((params) => {
      // Get Single Customer Data
      this.sub = this.customerService.getByCustomerID(+params['id']).subscribe(customer => {
        if (customer) {
          this.customer = customer;
        }
      });
    });
  }

  //-------------------------------
  //     Public Functions
  //-------------------------------
  /**
   * Remove Customer Data And Navigate back to list view
   */
  public removeCustomer() {
    this.customerService.deleteCustomer(this.customer.customerID).subscribe(() => {
      this.router.navigate([pages.customerManagement.path]);
    })
  }
}

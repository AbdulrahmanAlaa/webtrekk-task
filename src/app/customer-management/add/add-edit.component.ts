import { Subscription } from 'rxjs';
import { pages } from './../../config/pages-config';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  /** defines if we are in edit mode or add mode */
  public isEditMode = false;

  /** holds current customer data */
  public customer: Customer;

  /** holds current date as intial value for customer birthday*/
  public initialDate = new Date();

  /** holds the form that contains customer data */
  public addCustomerForm: FormGroup;

  /** holds the subscription intfo in order to be deleted to clear the memory */
  private sub: Subscription = null;


  /*************  Life Cycle Hooks  ***********/
  /**
 * parameters passed by angular Dependency Injection 
 * @param customersService  contains the CRUD operation to handle customers data 
 * @param route  contains current active route data and paramenters
 * @param router  Helps and navigating between routes 
 * @param formBuilder  Helps and creating and validating Forms using reactive way
 */
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Find the Cusomer ID from URL segment    
    this.route.params.subscribe((params) => {
      // Get Single Customer Data      
      this.sub = this.customerService.getByCustomerID(+params['id']).subscribe(customer => {
        if (customer) {
          this.isEditMode = true;
          this.customer = customer
        }
      });
    });

    // Create Form object with required validation rules
    this.addCustomerForm = this.formBuilder.group({
      fname: [this.isEditMode ? this.customer.name.first : '', Validators.required],
      lname: [this.isEditMode ? this.customer.name.last : '', Validators.required],
      birthday: [this.isEditMode ? new Date(this.customer.birthday) : new Date()],
      gender: 'm'
    });
  }


  //-------------------------------
  //     Public Functions
  //-------------------------------

  public setGender(value: string) {
    this.addCustomerForm.controls.gender.setValue(value);
  }

  /**
   * Send Customer data to server in order to update/Add it
   */
  public submit() {
    if (this.addCustomerForm.valid) {
      if (this.isEditMode) {
        this.customerService.updateCustomer(this.addCustomerForm.value, this.customer.customerID).subscribe(customer => this.handleSuccess(customer));
      } else {
        this.customerService.addCustomer(this.addCustomerForm.value).subscribe(customer => this.handleSuccess(customer));
      }
    }
  }

  /** handle navigation to list view */
  private handleSuccess(customer) {
    this.router.navigate([pages.customerManagement.path]);
  }
}

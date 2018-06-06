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
  public isEditMode = false;
  public customer: Customer;
  public initialDate = new Date();

  public addCustomerForm: FormGroup;

  private sub: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.sub = this.customerService.getByCustomerID(+params['id']).subscribe(customer => {
        if (customer) {
          this.isEditMode = true;
          this.customer = customer
        }
        console.log('edit', customer);
      });
    });

    this.addCustomerForm = this.formBuilder.group({
      fname: [this.isEditMode ? this.customer.name.first : '', Validators.required],
      lname: [this.isEditMode ? this.customer.name.last : '', Validators.required],
      birthday: [this.isEditMode ? new Date(this.customer.birthday) : new Date()],
      gender: 'm'
    });
  }

  setGender(value: string) {
    this.addCustomerForm.controls.gender.setValue(value);
  }

  submit() {
    if (this.addCustomerForm.valid) {
      if (this.isEditMode) {
        this.customersService.updateCustomer(this.addCustomerForm.value,this.customer.customerID).subscribe(customer =>  this.handleSuccess(customer));
      } else {
        this.customersService.addCustomer(this.addCustomerForm.value).subscribe(customer =>  this.handleSuccess(customer));
      }
    }
  }
  handleSuccess(customer) {
    this.router.navigate([pages.customerManagement.path]);
  }
}

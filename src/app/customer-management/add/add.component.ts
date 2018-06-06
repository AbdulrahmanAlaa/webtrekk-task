import { pages } from './../../config/pages-config';
import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public initialDate = new Date();

  public addCustomerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private router:Router
  ) {
  }
  
  ngOnInit() {
    this.addCustomerForm = this.formBuilder.group({
      fname:[ '',Validators.required],
      lname: ['',Validators.required],
      birthday: [new Date()],
      gender:'m'
    });
  }

  setGender(value:string){
    this.addCustomerForm.controls.gender.setValue(value);
  }

  submit() {
    if (this.addCustomerForm.valid) {
      this.customersService.addCustomer(this.addCustomerForm.value).subscribe(customer=>{
        this.router.navigate([pages.customerManagement.path]);
      });
    }
  }
}

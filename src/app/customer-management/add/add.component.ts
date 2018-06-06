import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'wt-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public initialDate = new Date();

  public addCustomerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addCustomerForm = this.formBuilder.group({
      fname: '',
      lname: '',
      birthday: [new Date()],
      gender:'m'
    });
  }

  ngOnInit() {
  }

  setGender(value:string){
    this.addCustomerForm.controls.gender.setValue(value);
  }

  submit() {
    console.log(this.addCustomerForm.value)
  }
}

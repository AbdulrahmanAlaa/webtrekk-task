import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'wt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /** holds register form fields and validations */
  public registerForm: FormGroup;

  /** holds form state if the submitted it */
  public submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(38)]]
    });
  }

  /** register the User */
  submit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // ToDo:
      // Login The User and save the token
      
    }
  }

}

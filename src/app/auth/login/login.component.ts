import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from './../../shared/interfaces/user.d';
import { Router } from '@angular/router';
import { pages } from '../../config/pages-config';

@Component({
  selector: 'wt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /** holds login form fields and validations */
  public loginForm: FormGroup;

  /** holds form state if the submitted it */
  public submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(38)]]
    });
  }

  /** Log the User In */
  submit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // ToDo:
      // Login The User and save the token
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
        this.router.navigate([pages.customerManagement.path]);
      });
    }
  }

}

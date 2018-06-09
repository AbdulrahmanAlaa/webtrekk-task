import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { pages } from './../../config/pages-config';
import { CustomersService } from './../customers.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  /** defines if we are in edit mode or add mode */
  public isEditMode = false;

  /** show spinner while loading data */
  public showSpinner = false;

  /** holds current customer data */
  public customer: Customer = null;

  /** holds current date as intial value for customer birthday*/
  public initialDate = new Date();

  /** holds the form that contains customer data */
  public addCustomerForm: FormGroup;

  /** holds the subscription intfo in order to be deleted to clear the memory */
  private sub: Subscription = null;

  public customerImageURL: string = null;

  public submitted = false;

  public imageError = '';

  @ViewChild('customerimage')
  customerimage: ElementRef<HTMLInputElement>;

  /*************  Life Cycle Hooks  ***********/
  /**
 * parameters passed by angular Dependency Injection 
 * @param customersService  contains the CRUD operation to handle customers data 
 * @param route  contains current active route data and paramenters
 * @param router  Helps and navigating between routes 
 * @param formBuilder  Helps and creating and validating Forms using reactive way
 */
  constructor(
    private translateService:TranslateService,
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
      const id = +params['id'];
      if (id) {
        // Edit Customer Case
        this.showSpinner = true;

        // Get Customer Information from backend
        this.sub = this.customerService.getByCustomerID(+params['id']).subscribe(customer => {
          if (customer) {
            this.isEditMode = true;
            this.customer = customer;
            this.showSpinner = false;
          }
          // Create Form object with required validation rules
          this.addCustomerForm = this.formBuilder.group({
            fname: [this.isEditMode ? this.customer.name.first : '', Validators.required],
            lname: [this.isEditMode ? this.customer.name.last : '', Validators.required],
            birthday: [this.isEditMode ? new Date(this.customer.birthday) : new Date()],
            gender: 'm'
          });

          // Set Customer Image
          this.customer.customerImage = this.customer.customerImage || { name: '', value: '' };
          this.customerImageURL = this.customer.customerImage.value ? this.customer.customerImage.value : this.addCustomerForm.controls.gender.value == 'm' ? 'assets/images/male.png' : 'assets/images/female.png';

        }, error => this.router.navigate([pages.customerManagement.path]));
      }
      else {
        // Adding Customer Scenario
        this.addCustomerForm = this.formBuilder.group({
          fname: [this.isEditMode ? this.customer.name.first : '', Validators.required],
          lname: [this.isEditMode ? this.customer.name.last : '', Validators.required],
          birthday: [this.isEditMode ? new Date(this.customer.birthday) : new Date()],
          gender: 'm'
        });
        // Set Default Image
        this.customerImageURL = this.addCustomerForm.controls.gender.value == 'm' ? 'assets/images/male.png' : 'assets/images/female.png';
      }

    }, () => {
      this.showSpinner = false;
    });
  }


  //-------------------------------
  //     Public Functions
  //-------------------------------

  public setGender(value: string) {
    this.addCustomerForm.controls.gender.setValue(value);
    if (this.customerImageURL && this.customerImageURL.match(/male.png|female.png/))
      this.customerImageURL = this.addCustomerForm.controls.gender.value == 'm' ? 'assets/images/male.png' : 'assets/images/female.png';

  }

  /**
   * Display the Customer image after selecting new one and validating the image
   * @param event Event of file changed that holds the file input info
   */
  public customerImageChanged(event: Event) {

    const input = event.target as HTMLInputElement || event.srcElement as HTMLInputElement;
    if (input.files && input.files[0] && FileReader) {

      // Validate Image 
      var Extension = input.value.substring(input.value.lastIndexOf('.') + 1).toLowerCase();
      if (Extension == "gif" || Extension == "png" || Extension == "jpeg" || Extension == "jpg") {
        var size = input.files[0].size;
        console.log(input.files[0].size)
        if (size > (1024 * 500)) {
          this.imageError = this.translateService.instant('common.errors.image-size');
          return;
        } else {
          const reader = new FileReader();

          reader.readAsDataURL(input.files[0]);

          reader.onload = (e: any) => {
            this.customerImageURL = e.target && e.target.result;
            this.imageError = '';
          };
        }
      } else {
        this.imageError = this.translateService.instant('common.errors.image-ext');
      }

    } else {
      this.customerImageURL = this.addCustomerForm.controls.gender.value == 'm' ? 'assets/images/male.png' : 'assets/images/female.png';
      this.imageError = '';
    }
  }

  /**
   * Send Customer data to server in order to update/Add it
   */
  public submit() {
    this.submitted = true;
    if (this.addCustomerForm.valid) {
      const data = {
        ...this.addCustomerForm.value,
        file: this.customerimage.nativeElement.files[0] ? {
          name: `${this.addCustomerForm.controls.fname.value}_${this.addCustomerForm.controls.lname.value}_${+new Date()}`,
          value: this.customerImageURL
        } : null
      };
      if (this.isEditMode) {
        this.customerService.updateCustomer(data, this.customer.customerID).subscribe(customer => this.handleSuccess(customer));
      } else {
        this.customerService.addCustomer(data).subscribe(customer => this.handleSuccess(customer));
      }
    }
  }

  /** handle navigation to list view */
  private handleSuccess(customer) {
    this.router.navigate([pages.customerManagement.path]);
  }

}

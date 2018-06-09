import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent implements OnInit {
  @Input()
  public customer: Customer;
  ngOnInit(): void {
    this.customer.customerImage = this.customer.customerImage || { name: '', value: '' };
    this.customer.customerImage.value = this.customer.customerImage.value? this.customer.customerImage.value:this.customer.gender == 'm' ? 'assets/images/male.png' : 'assets/images/female.png'
  }


}

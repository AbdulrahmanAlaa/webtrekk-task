import { Component, Input } from '@angular/core';
import { Customer } from '../../shared/interfaces/customer.interface';

@Component({
  selector: 'wt-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent  {

  @Input()
  public customer: Customer;

}

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(    private translate: TranslateService
  ) { }

  ngOnInit() {
  }
  languageChanged(language){
    //Configure the Language to be English by default
    this.translate.use(language);
 }
}

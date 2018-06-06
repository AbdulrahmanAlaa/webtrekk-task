import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES, DEFAULT_LANGUAGE } from './config/defines';

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * parameters passed by angular Dependency Injection 
   * @param translate  
   */
  constructor(
    private translate: TranslateService
  ) {
    // Configure the Language to be English by default
    this.translate.addLangs(LANGUAGES);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(DEFAULT_LANGUAGE);
  }
}

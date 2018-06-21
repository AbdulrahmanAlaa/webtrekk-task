import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'wt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  /**
     * parameters passed by angular Dependency Injection
     * @param translate
     */
  constructor(private translate: TranslateService
  ) { }


  /**
   * Change Current Language
   * @param language {string} as de or en represents language name
   */
  languageChanged(language) {
    // Configure the Language to be English by default
    this.translate.use(language);
  }
}

import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { pages } from './../../config/pages-config';

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
  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) { }


  /**
   * Change Current Language
   * @param language {string} as de or en represents language name
   */
  languageChanged(language) {
    // Configure the Language to be English by default
    this.translate.use(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([pages.auth.login.path]);
  }
}

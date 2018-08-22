import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { pages } from './../../config/pages-config';

@Component({
  selector: 'wt-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.socialLogin(token);
        this.router.navigate([pages.customerManagement.path]);
      } else {
        this.router.navigate([pages.auth.login.path]);
      }
    });
  }

}

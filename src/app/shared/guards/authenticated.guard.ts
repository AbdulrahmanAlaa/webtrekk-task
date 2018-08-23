import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { LOCAL_STORAGE_TOKEN } from '../../config/defines';
import { pages } from './../../config/pages-config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private storageService: StorageService) {
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    const token = (this.storageService.user && this.storageService.user.token) || this.storageService.getStorage(LOCAL_STORAGE_TOKEN);
    if (token) {
      return true;
    } else {
      this.router.navigate([pages.auth.login.path]);
      return false;
    }

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = (this.storageService.user && this.storageService.user.token) || this.storageService.getStorage(LOCAL_STORAGE_TOKEN);
    if (token) {
      return true;
    } else {
      this.router.navigate([]);
      return false;
    }
  }
}

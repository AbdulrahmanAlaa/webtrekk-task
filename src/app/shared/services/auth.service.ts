import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from './../../config/api-route';
import { User } from './../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { LOCAL_STORAGE_USER } from '../../config/defines';
import { LOCAL_STORAGE_TOKEN } from './../../config/defines';
import { JwtHelperService } from './jwt-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private storageService: StorageService
  ) { }

  register(user: User) {
    return this.http.post(API_ROUTES.POST_REGISTER, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(API_ROUTES.POST_LOGIN, { email, password }).pipe(map((response: any) => {
      this.storageService.setStorage(LOCAL_STORAGE_USER, response.user);
      this.storageService.setStorage(LOCAL_STORAGE_TOKEN, response.token);
      this.storageService.user = {} as User;
      this.storageService.user.email = response.user.email;
      this.storageService.user.token = response.user.token;
      this.storageService.authentication.next(true);

      return response;
    }));
  }

  logout() {
    this.storageService.user = null;
    this.storageService.empty();
    this.storageService.authentication.next(false);
  }


  socialLogin(token) {
    this.storageService.empty();
    const user = {} as User;
    user.token = token;
    user.email = this.jwtHelperService.decodeToken(token).email;
    this.storageService.setStorage(LOCAL_STORAGE_TOKEN, token);
    this.storageService.setStorage(LOCAL_STORAGE_USER, user);
    this.storageService.authentication.next(true);
  }

}

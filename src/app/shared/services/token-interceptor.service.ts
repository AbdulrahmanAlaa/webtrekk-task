import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { LOCAL_STORAGE_TOKEN } from './../../config/defines';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = (this.storageService.user && this.storageService.user.token) || this.storageService.getStorage(LOCAL_STORAGE_TOKEN);
    let headers = {};

    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }
    request = request.clone({
      setHeaders: headers
    });
    return next.handle(request);
  }


}

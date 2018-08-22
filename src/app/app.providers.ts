import { AuthService } from './shared/services/auth.service';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './shared/services/storage.service';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';

export const providers = [
    AuthenticatedGuard,
    AuthService,
    StorageService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }
];

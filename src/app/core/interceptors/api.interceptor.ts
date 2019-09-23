import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor(public authSrv: AuthenticationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith('api')) {
			request = request.clone({ url: '/' + request.url});
		}

		if (request.url.startsWith('/api')) {
			request = request.clone({ url: environment.apiUrl + request.url });
		}
		return next.handle(request);
	}

}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '~core/auth';
import { environment } from 'environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor(public tokenSrv: TokenService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith('api')) {
			request = request.clone({ url: '/' + request.url});
		}

		if (request.url.startsWith('/api')) {
			request = request.clone({
				url: environment.apiUrl + request.url,
				headers: request.headers.set('Authorization', this.tokenSrv.authJwtToken)
			});
		}
		return next.handle(request);
	}

}

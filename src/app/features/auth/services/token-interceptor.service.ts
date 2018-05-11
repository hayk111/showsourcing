import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '~auth/services//token.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
	constructor(private tokenSrv: TokenService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authToken = this.tokenSrv.token;
		if (authToken)
			request = request.clone({
				setHeaders: {
					'x-auth-token': authToken,
				},
			});
		return next.handle(request);
	}
}

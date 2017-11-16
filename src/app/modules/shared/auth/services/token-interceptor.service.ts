import { Injectable, Injector } from '@angular/core';
import { HttpRequest,  HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { TokenService } from './token.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {


	constructor(private tokenSrv: TokenService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authToken = this.tokenSrv.token;
		if (authToken)
			request = request.clone({
				setHeaders: {
					'x-auth-token': authToken
				}
			});
		return next.handle(request);
	}

}

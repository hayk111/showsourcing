import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '~core/auth';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor(public tokenSrv: TokenService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const realmUser = this.tokenSrv.getRealmUser();
		const token = realmUser ? (realmUser as any).token : '';
		request = request.clone({
			setHeaders: {
				Authorization: token
			}
		});
		return next.handle(request);
	}
}

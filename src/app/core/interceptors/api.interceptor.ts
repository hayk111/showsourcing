import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor(public authSrv: AuthenticationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith('api')) {
			request = request.clone({ url: '/' + request.url});
		}

		if (request.url.startsWith('/api')) {
			request = request.clone({
				url: environment.apiUrl + request.url,
				headers: request.headers.set('Authorization', this.authSrv.authToken)
			});
			return next.handle(request).pipe(
				catchError(error => this.onError(error, request, next)),
			);
		}
		return next.handle(request);
	}

	onError(error: Error, request: HttpRequest<any>, next: HttpHandler): Observable<never> {
		if (!(error instanceof HttpErrorResponse))
			return Observable.throw(error);

		switch ((<HttpErrorResponse>error).status) {
			case 401: return this.handle401Error(request, next);
			default: return Observable.throw(error);
		}
	}

	handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<never> {
		return this.authSrv.refreshAuthToken();
	}

}

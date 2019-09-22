// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
// import { Observable } from 'rxjs';
// import { TokenService } from '~core/auth';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

// 	constructor(public tokenSrv: TokenService) {}

// 	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// 		if (request.url.startsWith('api')) {
// 			request = request.clone({ url: '/' + request.url});
// 		}

// 		if (request.url.startsWith('/api')) {
// 			request = request.clone({
// 				url: environment.apiUrl + request.url,
// 				headers: request.headers.set('Authorization', this.tokenSrv.authJwtToken)
// 			});
// 			return next.handle(request).pipe(
// 				catchError(error => this.onError(error, request, next)),
// 			);
// 		}
// 		return next.handle(request);
// 	}

// 	onError(error: Error, request: HttpRequest<any>, next: HttpHandler): Observable<never> {
// 		if (error instanceof HttpErrorResponse) {
// 			switch ((<HttpErrorResponse>error).status) {
// 				case 401: return this.handle401Error(request, next);
// 			}
// 		} else {
// 			return Observable.throw(error);
// 		}
// 	}

// 	handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<never> {
// 		// this.authSrv.refreshAuthToken();
// 		throw Error('not implemented yet');
// 	}

// }

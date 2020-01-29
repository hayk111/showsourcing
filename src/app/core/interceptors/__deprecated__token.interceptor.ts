// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import { AuthenticationService } from '~core/auth/services/authentication.service';


// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
// 	private refreshTokenInProgress = false;
// 	// Refresh Token Subject tracks the current token, or is null if no token is currently
// 	// available (e.g. refresh pending).
// 	private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(
// 		null
// 	);
// 	constructor(private authSrv: AuthenticationService) {}

// 	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// 		if (!request.url.startsWith(environment.apiUrl)) {
// 			return next.handle(request);
// 		}

// 		return next.handle(this.addToken(request)).pipe(
// 			catchError(error => this.onError(error, request, next)),
// 		);
// 	}

// 	private addToken(request: HttpRequest<any>) {
// 		if (request.url.startsWith(`${environment.apiUrl}/user`)) {
// 			return request;
// 		}
// 		const token = this.authSrv.authToken;
// 		return request.clone({ headers: request.headers.set('Authorization', token)	});
// 	}

// 	private onError(error: Error, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

// 		// We don't want to refresh token for some requests like login or refresh token itself
// 		// So we verify url and we throw an error if it's the case
// 		if (request.url.startsWith(`${environment.apiUrl}/user`)) {
// 			// We do another check to see if refresh token failed
// 			// In this case we want to logout user and to redirect it to login page
// 			if (request.url.includes(`${environment.apiUrl}/user/renew`)) {
// 				this.authSrv.signOut();
// 			}
// 			return throwError(error);
// 		}

// 		// If error status is different than 401 we want to skip refresh token
// 		// So we check that and throw the error if it's the case
// 		if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
// 			return throwError(error);
// 		}
// 		if (this.refreshTokenInProgress) {
// 			// If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
// 			// – which means the new token is ready and we can retry the request again
// 			return this.refreshToken$.pipe(
// 				filter(result => result !== null),
// 				take(1),
// 				switchMap(() => next.handle(this.addToken(request)))
// 			);
// 		} else {
// 			this.refreshTokenInProgress = true;
// 			// Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
// 			this.refreshToken$.next(null);
// 			// Call auth.refreshAccessToken(this is an Observable that will be returned)
// 			return this.authSrv.refreshAuthToken().pipe(
// 				switchMap((token: string) => {
// 					// When the call to refreshToken completes we reset the refreshTokenInProgress to false
// 					// for the next time the token needs to be refreshed
// 					this.refreshTokenInProgress = false;
// 					this.refreshToken$.next(token);

// 					return next.handle(this.addToken(request));
// 				}),
// 				catchError((err: any) => {
// 					this.refreshTokenInProgress = false;
// 					this.authSrv.signOut();
// 					return throwError(error);
// 				})
// 			);
// 		}
// 	}

// }

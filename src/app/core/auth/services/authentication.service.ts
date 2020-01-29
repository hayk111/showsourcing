import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, filter, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { log } from '~utils';
import { AuthStatus, Credentials, RegistrationCredentials } from '../interfaces';
import { showsourcing } from '~utils/debug-object.utils';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private awsAuth = this.amplifySrv.auth();
	authState$: Observable<AuthState> = this.amplifySrv.authStateChange$.pipe(
		// to get the first state
		distinctUntilKeyChanged('state'),
		tap(state => showsourcing.auth.state = state),
		shareReplay(1),
	);
	// !
	/** to rename  */
	authStatus$: Observable<AuthStatus> = this.authState$.pipe(
		map(authState => authState.state === 'signedIn' ? AuthStatus.AUTHENTICATED : AuthStatus.NOT_AUTHENTICATED)
	);
	/** event that fires when we sign in */
	signIn$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.AUTHENTICATED),
		mapTo('true')
	);
	/** event that fires when we sign out */
	signOut$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		mapTo(null)
	);
	// !
	/** to be determined if needed */
	authToken: string;

	constructor(
		private amplifySrv: AmplifyService,
		private router: Router
	) {
		// for debugging purpose
		showsourcing.auth = {};
	}

	signIn(credentials: Credentials) {
		const { username, password } = credentials;
		return this.awsAuth.signIn(username, password)
		.then(user => {
			// when user was created via the incognito console
			if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				// go to new password
			} else {
				this.router.navigate([ '/' ]);
			}
		})
		.catch(err => {
			if (err.code === 'UserNotConfirmedException') {
				this.goToConfirmSignUp(username);
			} else if (err.code === 'PasswordResetRequiredException') {
				this.goToForgotPassword(username);
			} else {
				// rethrowing for catch in view
				throw err;
			}
		});
	}

	signOut() {
		this.awsAuth.signOut();
	}

	signUp(credentials: RegistrationCredentials) {
		const { username , password, firstName, lastName } = credentials;
		return this.awsAuth.signUp({
			username,
			password,
			attributes: {
				'custom:firstName': firstName,
				'custom:lastName': lastName
			}
		})
		.then(_ => this.goToConfirmSignUp(username));
	}

	confirmSignUp(username: string, token: string) {
		return this.awsAuth.confirmSignUp(username, token)
		.then(_ => this.goToSignIn(username));
	}

	resendSignUp(username: string) {
		return this.awsAuth.resendSignUp(username);
	}

	forgotPassword(username: string) {
		return this.awsAuth.forgotPassword(username)
		.then(data => this.goToForgotPasswordSubmit(username));
	}

	forgotPasswordSubmit(username: string, code: string, newPassword: string) {
		return this.awsAuth.forgotPasswordSubmit(username, code, newPassword)
		.then(_ => this.goToSignIn(username));
	}

	resetPassword(cred: { email: string }): Observable<any> {
		throw Error('not implemented yet');
	}

	confirmResetPassword({ token, password }: { token: string; password: string; }): Observable<any> {
		throw Error('not implemented yet');
	}

	getEmailFromUrl() {
		return undefined;
	}

	refreshAuthToken(): Observable<any> {
		throw Error('not implemented yet');
	}

	checkPassword(any: any): Observable<any> {
		throw Error('not implemented yet');
	}

	//
	// Easy routing
	//

	goToSignIn(username?: string) {
		this.router.navigate(['auth', 'sign-in' ], { queryParams: { username }});
	}

	goToSignUp() {
		this.router.navigate([ 'auth', 'sign-up' ]);
	}

	goToConfirmSignUp(username: string) {
		this.router.navigate([ 'auth', 'confirm-sign-up'], { queryParams: { username }});
	}

	goToForgotPassword(username?: string) {
		this.router.navigate([ 'auth', 'forgot-password'], { queryParams: { username }});
	}

	goToForgotPasswordSubmit(username?: string) {
		this.router.navigate([ 'auth', 'forgot-password-submit'], { queryParams: { username }});
	}

}

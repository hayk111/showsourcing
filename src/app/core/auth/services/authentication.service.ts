import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, filter, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { showsourcing } from '~utils/debug-object.utils';
import { AuthStatus, Credentials, RegistrationCredentials } from '../interfaces';



/**
 * Authentication service responsible for authentication.
 *
 * Few words on the design choices:
 *
 * 1. The design pattern is to return a promise. The meaningful errors are catched in the view
 * to display an error message. Async / await is not used because at the time of writing this it's not
 * working properly with change detection (Angular 8). https://github.com/angular/angular/issues/31730
 *
 * 2. A second design pattern is to do the routing here in this service, so we have an entry point for all
 * the authentication related routing.
 * The alternative would have been to have it in the components which would have split all the cases.
 * Here it's centralized. We could have centralized it elsewhere but I chosed to do it here.
 *
 * 3. the username is used in a lot of calls, we could have saved it on the service itself but
 * I chosed to pass it around in the url to make the service more pure / stateless.
 * So if you go on a specific url while you are unauthenticated the result will be the same.
 * The advantage is that if an user does an F5 it keeps working.
 * The disadvantage is that we cannot do the sign in right after code validation. Since Antoine
 * wants that to be the case the password will be saved on the service here
 *
 */

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private awsAuth = this.amplifySrv.auth();
	private authState: AuthState;
	authState$: Observable<AuthState> = this.amplifySrv.authStateChange$.pipe(
		// to get the first state
		distinctUntilKeyChanged('state'),
		tap(state => this.authState = state),
		tap(state => showsourcing.auth.state = state),
		shareReplay(1)
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

	// SIGN IN FLOWS
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

	forgotPassword(username: string) {
		return this.awsAuth.forgotPassword(username)
		.then(_ => this.goToForgotPasswordSubmit(username));
	}

	forgotPasswordSubmit(username: string, code: string, newPassword: string) {
		return this.awsAuth.forgotPasswordSubmit(username, code, newPassword)
		.then(_ => this.signIn({ username, password: newPassword }));
	}

	completeNewPassword(username, newPassword, attributes?: { firstName: string, lastName: string }) {
		const { firstName, lastName } = attributes;
		return this.awsAuth.completeNewPassword(
			this.authState.user, // the Cognito User Object
			newPassword, // the new password
			// OPTIONAL, the required attributes
			{
				'custom:firstName': firstName,
				'custom:lastName': lastName
			}
		).then(_ => this.goToSignIn(username));
	}

	// SIGN OUT FLOWS

	signOut() {
		this.awsAuth.signOut().then(_ => this.goToSignIn());
	}

	// SIGN UP FLOWS

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

	//
	// Routing
	//

	goToSignIn(username?: string) {
		this.router.navigate(['auth', 'sign-in' ], { queryParams: { username } });
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

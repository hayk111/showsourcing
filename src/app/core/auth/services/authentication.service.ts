import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { showsourcing } from '~utils/debug-object.utils';
import { AuthStatus } from './auth-state.interface';
import { Credentials, RegistrationCredentials } from './credentials.interface';
import { ApiLibService } from '~core/api-lib';

/**
 * Authentication service responsible for authentication.
 *
 * Few words on the design choices:
 *
 * 1. The design pattern is to return a promise. The meaningful errors are catched in the view
 * to display an error message. At this time, Async / await is not used because at the time of writing this it's not
 * working properly with change detection (Angular 8). https://github.com/angular/angular/issues/31730
 *
 * 2. A second design pattern is to do the routing here in this service, so we have an entry point for all
 * the authentication related routing.
 * The alternative would have been to have it in the components which would have split all the cases.
 * Here it's centralized. We could have centralized it elsewhere though
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

	/** Amplify Auth for easy access */
	private awsAuth: any = {};
	/** State returned by amplifyAuth */
	authState: AuthState;
	authState$ = new BehaviorSubject<AuthState>({
		user: null,
		state: AuthStatus.NOT_AUTHENTICATED
	});
	// this.amplifySrv.authStateChange$.pipe(
	// 	tap(state => this.authState = state),
	// 	tap(state => showsourcing.auth.state = state),
	// 	shareReplay(1)
	// );
	// !
	/** to rename  */
	/** event that fires when we sign in */
	signIn$ = this.authState$.pipe(
		filter(authState => authState.state === AuthStatus.AUTHENTICATED),
		// map to the id, yes username is the id here
		map(_ => this.authState.user.username)
	);
	/** event that fires when we sign out */
	signOut$ = this.authState$.pipe(
		filter(authState => authState.state === AuthStatus.NOT_AUTHENTICATED),
		mapTo(null)
	);
	// we have to keep the state for the password
	// because as of now, amplify doesn't automatically sign in
	// after a sign up
	private signUpPassword: string;

	constructor(
		private apiLibSrv: ApiLibService,
		private router: Router
	) {
		// for debugging purpose
		showsourcing.auth = {};
	}

	// SIGN IN FLOWS
	signIn(credentials: Credentials): Promise<any> {
		const { username, password } = credentials;

		// authenticated$ = client.srv.authStatus.user$.pipe(map(user => !!user));\
		return this.apiLibSrv.apiClient.srv.authStatus.Auth.signIn(username, password)
			.then(user => {
				console.log('AuthenticationService -> user', user);
				// when user was created via the incognito console
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					// go to new password
				} else {
					this.authState = {
						state: AuthStatus.AUTHENTICATED,
						user
					};
					this.authState$.next(this.authState);
					this.router.navigate([ '/' ]);
				}
				return user;
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
		).then(_ => this.goToSignIn(username));
	}

	// SIGN OUT FLOWS

	signOut() {
		this.apiLibSrv.apiClient.srv.authStatus.Auth.signOut().then(_ => this.router.navigate(['login']));
	}

	// SIGN UP FLOWS

	signUp(credentials: RegistrationCredentials) {
		const { username , password, firstName, lastName } = credentials;
		return this.awsAuth.signUp({
			username,
			password,
			attributes: {
				'given_name': firstName,
				'family_name': lastName
			}
		})
		.then(_ => this.goToConfirmSignUp(username));
	}

	confirmSignUp(username: string, token: string) {
		return this.awsAuth.confirmSignUp(username, token)
		.then(_ => {
			if (this.signUpPassword) {
				this.signIn({ username, password: this.signUpPassword });
				this.signUpPassword = undefined;
			} else {
				this.goToSignIn(username);
			}
		});
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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, mapTo } from 'rxjs/operators';
import { authStatus, IAuthState, state, Auth } from 'showsourcing-api-lib';
import { showsourcing } from '~utils/debug-object.utils';
import { Credentials, RegistrationCredentials } from './credentials.interface';
import { log } from '~utils/log';

/**
 * Authentication service responsible for authentication.
 *
 * Few words on the design choices:
 *
 * 1. the state is managed by the lib. So this is merely an interface to do the signIn, signOut and the lib
 * does the rest
 *
 * 2. The design pattern is to return a promise. The meaningful errors are catched in the view
 * to display an error message. At this time, Async / await is not used because at the time of writing this it's not
 * working properly with change detection (Angular 8). https://github.com/angular/angular/issues/31730
 *
 * 3. A second design pattern is to do the routing here in this service, so we have an entry point for all
 * the authentication related routing.
 * The alternative would have been to have it in the components which would have split all the cases.
 * Here it's centralized. We could have centralized it elsewhere though
 *
 * 4. the username is used in a lot of calls, we could have saved it on the service itself but
 * I chosed to pass it around in the url to make the service more pure / stateless.
 * So if you go on a specific url while you are unauthenticated the result will be the same.
 * The advantage is that if an user does an F5 it keeps working.
 * The disadvantage is that we cannot do the sign in right after code validation. Since Antoine
 * wants that to be the case the password will be saved on the service here
 *
 *
 */


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	// we have to keep the state for the password
	// because as of now, amplify doesn't automatically sign in
	// after a sign up
	private signUpPassword: string;
	/** event that fires when we sign in */
	signIn$ = state.user$.pipe(
		filter(user => !!user),
		// map to the id, yes username is the id here
		map((user: any) => user.username)
	);
	/** event that fires when we sign out */
	signOut$ = state.user$.pipe(
		filter(user => !user),
		mapTo(null)
	);

	constructor(
		private router: Router
	) {
		state.auth$.subscribe(state => log.debug(`auth state: ${state}`));
	}

	// SIGN IN FLOWS
	signIn(credentials: Credentials): Promise<any> {
		const { username, password } = credentials;

		// authenticated$ = client.srv.authStatus.user$.pipe(map(user => !!user));\
		return authStatus.signIn(username, password)
			.then(user => {
				// when user was created via the incognito console
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					// go to new password
				} else {
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
		return Auth.forgotPassword(username)
		.then(_ => this.goToForgotPasswordSubmit(username));
	}

	forgotPasswordSubmit(username: string, code: string, newPassword: string) {
		return Auth.forgotPasswordSubmit(username, code, newPassword)
		.then(_ => this.signIn({ username, password: newPassword }));
	}

	completeNewPassword(username, newPassword, attributes?: { firstName: string, lastName: string }) {
		const { firstName, lastName } = attributes;
		const user = state.user;
		return Auth.completeNewPassword(
			user, // the Cognito User Object
			newPassword, // the new password,
			attributes
		).then(_ => this.goToSignIn(username));
	}

	// SIGN OUT FLOWS

	signOut() {
		authStatus.signOut().then(_ => this.router.navigate(['login']));
	}

	// SIGN UP FLOWS
	signUp(credentials: RegistrationCredentials) {
		const { username , password, firstName, lastName } = credentials;
		return Auth.signUp({
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
		return Auth.confirmSignUp(username, token)
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
		return Auth.resendSignUp(username);
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

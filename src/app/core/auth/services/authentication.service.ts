import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Credentials, RegistrationCredentials, AuthStatus } from '../interfaces';
import { Observable } from 'rxjs';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { log } from '~utils';
import { map, filter, mapTo, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private awsAuth = this.amplifySrv.auth();
	authState$: Observable<AuthState> = this.amplifySrv.authStateChange$.pipe(
		// to get the first state
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
	) {  }

	async signIn(credentials: Credentials) {
		const { email: username, password } = credentials;
		try {
			const user = await this.awsAuth.signIn(username, password);
			if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				// go to new password
			} else {
				// go to dashboard
			}
		} catch (err) {
			if (err.code === 'UserNotConfirmedException') {
				// go to confirm email page
				log.error(err);
			} else if (err.code === 'PasswordResetRequiredException') {
				// go to password reset page
				log.error(err);
			} else if (err.code === 'NotAuthorizedException') {
				return 'incorrect credentials';
			} else if (err.code === 'UserNotFoundException') {
				return 'incorrect credentials';
			} else {
				log.error(err);

			}
		}
	}

	async signUp(credentials: RegistrationCredentials) {
		const { email , password, firstName, lastName } = credentials;
		const data = await this.awsAuth.signUp({
			username: email,
			password,
			attributes: {
				'custom:firstName': firstName,
				'custom:lastName': lastName
			}
		});
	}

	signOut() {
		this.awsAuth.signOut();
	}

	changePassword(login: string, password: string, newPassword: string): Observable<boolean> {
		throw Error('not implemented yet');
	}

	resetPassword(cred: { email: string }): Observable<any> {
		throw Error('not implemented yet');
	}

	confirmResetPassword({ token, password }: { token: string; password: string; }): Observable<any> {
		throw Error('not implemented yet');
	}

	async validateEmail(email: string, token: string) {
		await this.awsAuth.confirmSignUp(email, token);
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

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Log } from '@utils/index';
import { Credentials } from '../../features/auth/utils/credentials.interface';

// This is the authentication service. It posts to api/auth to authenticate the user when the user uses the login form.
// if the credentials are correct we receive the user. In the header of the response is a
// JWT.
//
// When the application starts, we need to know if the user is still authenticated from a previous session.
// To know how that happens please read the README of this module.

@Injectable()
export class AuthService {

	constructor(private router: Router,
							private http: HttpClient) {
		Log.debug('Auth Service Created');
	}


	login(credentials: Credentials): Observable<any> {
		return this.http
			.post('api/auth', credentials, { observe: 'response' });
	}

	register(credentials: {email: string, password: string}) {
		return this.http.post(`api/user`, credentials);
	}

	resetPw(email: string) {
		return this.http.post(`/api/password/${email}/reset`, {});
	}

}

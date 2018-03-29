
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../interfaces';
import { Log } from '~utils';
import { User } from '~app/entity';

// This is the authentication service. It posts to api/auth to authenticate the user when the user uses the login form.
// if the credentials are correct we receive the user. In the header of the response is a
// JWT.
//
// When the application starts, we need to know if the user is still authenticated from a previous session.
// To know how that happens please read the README of this module.

@Injectable()
export class AuthHttpService {

	constructor(private router: Router, private http: HttpClient) {
		Log.debug('Auth Service Created');
	}

	login(credentials: Credentials): Observable<HttpResponse<any>> {
		return this.http.post('api/auth', credentials, { observe: 'response' });
	}

	register(credentials: { email: string; password: string }): Observable<HttpResponse<any>> {
		return this.http.post(`api/user`, credentials, { observe: 'response' });
	}

	resetPw(email: string): Observable<any> {
		return this.http.post(`/api/password/${email}/reset`, {});
	}

	// if we previously authenticated the token is present in the local storage.
	// then we request the api/user. The http request is gonna be automatically
	// populated with the token thank to the token-interceptor.service
	getUser(): Observable<any> {
		return this.http.get('api/user');
	}
}

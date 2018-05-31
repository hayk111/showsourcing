
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces';
import { Log } from '~utils';
import { User } from '~models';
import { switchMap, tap } from 'rxjs/operators';


@Injectable()
export class AuthHttpService {

	constructor(private router: Router, private http: HttpClient) {
		Log.debug('Auth Service Created');
	}

	login(credentials: Credentials): Observable<any> {
		const loginObj = {
			app_id: '',
			provider: 'password',
			data: credentials.identifier,
			user_info: {
				register: false,
				password: credentials.password
			}
		};
		return this.http.post('graphql/auth', loginObj).pipe(
			tap(d => { debugger; })
		);
	}

	register(credentials: { email: string; password: string }): Observable<HttpResponse<any>> {
		return this.http.post(`api/user`, credentials, { observe: 'response' });
	}

	resetPw(email: string): Observable<any> {
		return this.http.post(`/api/password/${email}/reset`, {});
	}

	fetchAccessToken(refreshToken: string) {
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: refreshToken,
		};
		return this.http.post('graphql/auth', accessObj);
	}
}

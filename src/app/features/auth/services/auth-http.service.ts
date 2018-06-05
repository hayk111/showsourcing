
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces';
import { Log } from '~utils';
import { User } from '~models';
import { switchMap, tap, map } from 'rxjs/operators';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';
import { environment } from 'environments/environment';

const BASE_URI = 'http://vps540915.ovh.net:9080';

@Injectable()
export class AuthHttpService {

	constructor(private router: Router, private http: HttpClient) {
		Log.debug('Auth Service Created');
	}

	login(credentials: Credentials): Observable<RefreshTokenResponse> {
		const loginObj = {
			app_id: '',
			provider: 'password',
			data: credentials.identifier,
			user_info: {
				register: false,
				password: credentials.password
			}
		};
		return this.http.post<RefreshTokenResponse>(`${environment.apiUrl}/auth`, loginObj);
	}

	register(credentials: { email: string; password: string, firstName: string, lastName: string }): Observable<any> {
		const registrationObj = {
			app_id: '',
			provider: 'password',
			data: credentials.email,
			user_info: {
				register: true,
				...credentials
			}
		};
		return this.http.post(`api/auth`, registrationObj);
	}

	resetPw(email: string): Observable<any> {
		return this.http.post(`/api/password/${email}/reset`, {});
	}

}

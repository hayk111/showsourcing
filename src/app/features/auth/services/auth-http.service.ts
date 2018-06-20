import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';

import { Credentials } from '../interfaces';



@Injectable()
export class AuthHttpService {

	constructor(private http: HttpClient) {
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
		return this.http.post(`signup/user`, credentials);
	}

	resetPw(email: string): Observable<any> {
		return this.http.post(`/api/password/${email}/reset`, {});
	}

}

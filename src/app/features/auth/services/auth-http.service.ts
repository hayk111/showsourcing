import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';

import { Credentials } from '~features/auth/interfaces';



@Injectable({
	providedIn: 'root'
})
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
		return this.http.post(`${environment.signupUrl}`, credentials);
	}

	resetPw(email: string): Observable<any> {
		return this.http.post(`${environment.apiUrl}/api/password/${email}/reset`, {});
	}

}

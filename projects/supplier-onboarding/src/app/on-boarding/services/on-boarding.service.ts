import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '~features/auth/services/token.service';
import { RefreshTokenResponse } from '~features/auth/interfaces';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {

	constructor(
		private http: HttpClient,
		private tokenSrv: TokenService
	) { }

	/** initialize the realm connection to supplier onboarding realm */
	getAccessToken() {
		// we first get a refresh token
		// const refTokenReq = {
		// 	app_id: '',
		// 	provider: 'password',
		// 	data: 'supplier-onboarding',
		// 	user_info: {
		// 		register: false,
		// 		email: 'supplier-onboarding',
		// 		password: 'supplier-onboarding'
		// 	}
		// };

		// return this.http.post<RefreshTokenResponse>(`${environment.realmUrl}/auth`, refTokenReq).pipe(
		// 	// then an access token
		// 	switchMap(refToken => this.tokenSrv.getAccessToken('/test-supplier-onboarding'))
		// );



	}

	/** when we start this app we want to init the supplier claim */
	initClaim() {

	}

	/** after init the claim we want to continuously update it with
	 * new form submissions..
	 */
	updateClaim() {

	}
}

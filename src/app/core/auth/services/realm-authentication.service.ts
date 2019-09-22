import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Credentials as RealmCredentials, User as RealmUser } from 'realm-graphql-client';
import { LocalStorageService } from '~core/local-storage';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';


const REALM_USER = 'REALM_USER';


@Injectable({
	providedIn: 'root'
})
export class RealmAuthenticationService {

	realmUser: RealmUser;

	constructor(
		private localStorage: LocalStorageService
	) { }

	async getRealmUser(jwt: string) {
		this.realmUser = this.localStorage.getItem(REALM_USER);
		if (!this.realmUser) {
			const credentials = RealmCredentials.jwt(jwt);
			this.realmUser = await RealmUser.authenticate(credentials, environment.graphqlAuthUrl);
			this.localStorage.setItem(REALM_USER, this.realmUser);
		}
		return this.realmUser;
	}

}

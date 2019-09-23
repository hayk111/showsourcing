import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Credentials as RealmCredentials, User as RealmUser } from 'realm-graphql-client';
import { LocalStorageService } from '~core/local-storage';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { showsourcing } from '~utils/debug-object.utils';


const REALM_USER = 'REALM_USER';


@Injectable({
	providedIn: 'root'
})
export class RealmAuthenticationService {

	private _realmUser$ = new ReplaySubject<RealmUser>(1);
	realmUser$ = this._realmUser$.asObservable();
	realmUser: RealmUser;

	constructor(
		private localStorage: LocalStorageService,
		private authSrv: AuthenticationService
	) {
		showsourcing.realm = {};
	}

	init() {
		this.authSrv.authenticated$.subscribe(jwt => this.getRealmUser(jwt));
		this.authSrv.notAuthenticated$.subscribe(_ => this.clearUser());
		this.realmUser$.subscribe(realmUser => showsourcing.realm.realmUser = realmUser);
	}

	private async getRealmUser(jwt: string) {
		let realmUser: RealmUser = this.localStorage.getItem(REALM_USER);
		if (!realmUser) {
			const credentials = RealmCredentials.jwt(jwt);
			realmUser = await RealmUser.authenticate(credentials, environment.graphqlAuthUrl);
			this.localStorage.setItem(REALM_USER, realmUser);
		}
		this.realmUser = realmUser;
		this._realmUser$.next(realmUser);
	}

	clearUser() {
		this.localStorage.remove(REALM_USER);
		this._realmUser$.next(undefined);
		this.realmUser = undefined;
	}

}

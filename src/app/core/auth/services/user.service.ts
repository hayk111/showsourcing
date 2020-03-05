import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { EntityName, User } from '~core/erm/models';
import { ApiService } from '~core/erm3/services/api.service';
import { AnalyticsService } from '~core/analytics/analytics.service';


@Injectable({
	providedIn: 'root',
})
export class UserService {

	private _user$ = new Subject<User>();
	user$ = this._user$.asObservable();

	userSync: User;
	static userSync: User;
	userIdSync: string;
	static userIdSync: string;

	constructor(
		protected apiSrv: ApiService,
		protected authSrv: AuthenticationService,
		protected analyticsSrv: AnalyticsService
	) {
	}

	init() {
		this.authSrv.signIn$.pipe(
			// preemptively putting the "user" so we don't need to wait to make calls with user id
			tap(id => this.setupUser({ id } as User)),
			switchMap(id => this.apiSrv.queryOne('User', id).data$),
			distinctUntilChanged(),
		).subscribe(user => {
			this.setupUser(user);
			this.analyticsSrv.setupUser(user);
		});
	}

	selectUser() {
		return this.user$;
	}

	private setupUser(user: User) {
		this.userSync = user;
		this.userIdSync = user.id;
		UserService.userSync = user;
		UserService.userIdSync = user.id;
	}

}


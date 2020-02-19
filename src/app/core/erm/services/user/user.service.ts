import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { AuthenticationService } from '~core/auth';
import { User } from '~core/erm/models';
import { UserQueries } from '~core/erm/services/user/user.queries';
import { GlobalService } from '~core/erm/services/_global/global.service-2';


const customQueries = {
	queryOne: `
		query GetUser(id: $ID) {
			user(id: $id) {
				id
				firstName
				lastName
			}
		}
	`
};


@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	private _user$ = new Subject<string>();
	user$ = this._user$.asObservable();

	userSync: User;
	static userSync: User;
	userIdSync: string;
	static userIdSync: string;

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected http: HttpClient,
		protected authSrv: AuthenticationService
	) {
		super(UserQueries, 'user', customQueries);
	}

	init() {
		this.authSrv.signIn$.pipe(
			// preemptively putting the "user" so we don't need to wait to make calls with user id
			tap(id => this.setupUser({ id } as User)),
			switchMap(id => this.queryOne(id)),
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


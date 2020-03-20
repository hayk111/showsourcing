import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { User } from '~core/erm/models';
import { ApiService } from '~core/erm3/services/api.service';
import { AuthenticationService } from './authentication.service';


@Injectable({
	providedIn: 'root',
})
export class UserService {

	private _user$ = new Subject<User>();
	user$ = this._user$.asObservable();

	user: User;
	static user: User;
	userId: string;
	static userId: string;

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
			tap(id => this.apiSrv.setUserId(id)),
			switchMap(id => this.apiSrv.get('User', id).data$),
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
		this.user = user;
		this.userId = user.id;
		UserService.user = user;
		UserService.userId = user.id;
	}

}


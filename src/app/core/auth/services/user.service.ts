import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { authStatus } from 'lib';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { User } from '~core/erm/models';
import { AuthenticationService } from './authentication.service';


@Injectable({
	providedIn: 'root',
})
export class UserService {

	private _user$ = new ReplaySubject<User>(1);
	user$ = this._user$.asObservable();

	user: User;
	static user: User;
	userId: string;
	static userId: string;

	constructor(
		protected authSrv: AuthenticationService,
		protected analyticsSrv: AnalyticsService
	) {
	}

	init() {
		this.authSrv.signIn$.pipe(
			// preemptively putting the "user" so we don't need to wait to make calls with user id
			tap(id => this.setupUser({ id } as User)),
			// switchMap(_ => this.apiLibSrv.ready$.toPromise()),
			// switchMap(ready => {
			// 	// if (ready) {
			// 	// 	return this.apiLibSrv.db.get('User', this.userId);
			// 	// }
			// }),
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
		this._user$.next(user);
		this.user = user;
		this.userId = this.userId || user.id;
		UserService.user = user;
		UserService.userId = UserService.userId || user.id;
	}

}


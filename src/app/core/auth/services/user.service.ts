import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { User } from '~core/erm3';
import { authStatus } from 'showsourcing-api-lib';
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
			tap((userId: string) => this.setupUser(userId)),
			// switchMap(_ => this.apiLibSrv.ready$.toPromise()),
			// switchMap(ready => {
			// 	// if (ready) {
			// 	// 	return this.apiLibSrv.db.get('User', this.userId);
			// 	// }
			// }),
			distinctUntilChanged(),
		).subscribe(user => {
			this.analyticsSrv.setupUser(user);
		});
	}

	selectUser() {
		return this.user$;
	}

	private setupUser(userId: string) {
		const { given_name, family_name, sub, email } = authStatus.user.attributes;
		const user: User = {
			firstName: given_name,
			lastName: family_name,
			id: sub,
			email
		};
		this._user$.next(user);
		this.user = user;
		this.userId = this.userId || user.id;
		UserService.user = user;
		UserService.userId = UserService.userId || userId || user.id;
	}

}


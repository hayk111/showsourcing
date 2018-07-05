import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, shareReplay, tap } from 'rxjs/operators';
import { AuthState } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { User } from '~models';
import { ApolloClient } from '~shared/apollo/services/apollo-client.service';
import { ALL_USER_CLIENT, USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';

import { UserQueries } from './user.queries';

@Injectable({ providedIn: 'root' })
export class UserService {
	private queries = new UserQueries();
	private _user$ = new Subject<User>();
	user$: Observable<User> = this._user$.asObservable().pipe(
		tap(user => this.userSync = user),
		shareReplay(1)
	);
	userSync: User;

	constructor(private apollo: ApolloClient, private authSrv: AuthenticationService) {
	}

	init() {
		// when unauthenticated we clear the cache
		// when the user is connected (we can have an user id but not connected)
		// then we initialize the team client but we wait for the user client to be ready
		this.authSrv.authState$.pipe(
			distinctUntilChanged(),
			switchMap((authState: AuthState) => {
				// when authenticated we get the user
				if (authState.authenticated)
					return this.getUser(authState.userId);
				// when unauthenticated the user is undefined
				else
					return of(undefined);
			})
		).subscribe(this._user$);
	}

	/** gets the user from team realm */
	selectUser() {
		return this.user$;
	}

	update(user: User) {
		return this.apollo.use(USER_CLIENT).update({
			gql: this.queries.update,
			input: user
		});
	}

	/** gets user from all-users realm */
	private getUser(id: string) {
		// we use a query here because we need to get the user once from all_user client
		return this.apollo.use(ALL_USER_CLIENT).selectOne({
			gql: this.queries.one,
			id
		});
	}

}

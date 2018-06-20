import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { AuthState } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { User } from '~models';
import { ALL_USER_CLIENT, USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';



import { UserQueries } from './user.queries';
import { ApolloClient } from '~shared/apollo/services/apollo-client.service';

@Injectable({ providedIn: 'root' })
export class UserService {
	private _user$ = new ReplaySubject<User>(1);
	user$: Observable<User> = this._user$.asObservable();

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
			}),
		).subscribe(this._user$);
	}

	/** gets the user from team realm */
	selectUser() {
		// // if we get to here the user client is ready for sure because of the guard
		// return of(this.user$).pipe(

		// )this.apollo.subscribe({
		// 	query: UserQueries.selectUser,
		// 	variables: { query: `id == ${this.userId}` }
		// }).pipe(
		// 	// we can only subscribe on list at the moment
		// 	map((r: any) => r.data.users[0])
		// );
		return this.user$;
	}

	/** gets user from all-users realm */
	private getUser(id: string) {
		// we use a query here because we need to get the user once from all_user client
		return this.apollo.use(ALL_USER_CLIENT).subscribe({
			query: UserQueries.selectUser,
			variables: { query: `id == "${id}"` }
		}).pipe(
			map((r: any) => r.data.users[0])
		);
	}

}

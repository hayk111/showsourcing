import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Team } from '~models';
import { ApolloClient, ApolloService, USER_CLIENT_NAME } from '~shared/apollo';
import { UserQueries } from './user.queries';

@Injectable({ providedIn: 'root' })
export class UserService {

	constructor(private apolloSrv: ApolloService, private apollo: ApolloClient) {
	}

	selectUser() {
		// if we get to here the user client is ready for sure because of the guard
		return this.apollo.use(USER_CLIENT_NAME).subscribe({ query: UserQueries.selectUser }).pipe(
			// we can only subscribe on list at the moment
			map((r: any) => r.data.users[0])
		);
	}

}

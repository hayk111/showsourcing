import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserQueries } from '~features/user/services/user.queries';
import { Team } from '~models';
import { ApolloClient, ApolloService, USER_CLIENT_NAME } from '~shared/apollo';

@Injectable()
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

	selectTeams() {
		return this.apollo.use(USER_CLIENT_NAME).subscribe({ query: UserQueries.selectTeams }).pipe(
			map((r: any) => r.data.teams)
		);
	}

	pickTeam(team: Team) {
		return this.apolloSrv.selectTeam(team.id);
	}
}

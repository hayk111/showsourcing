import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { User } from '~models';
import { TeamQueries } from '~features/products/services/team.queries';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { take, map, filter, first } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

import { PER_PAGE } from '~utils/constants';

@Injectable()
export class TeamService {
	private membersQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		team members.
	 */
	private initializeTeamMembersQuery() {
		if (!this.membersQuery$) {
			this.membersQuery$ = this.apollo.query<any>({
				query: TeamQueries.memberList,
				variables: {
					query: '',
					skip: 0,
					take: PER_PAGE,
					sortBy: 'name',
					descending: true
				}
			});
		}
	}

	/*
		Initialize the underlying query ref for the list of
		team members.
	 */
	selectTeamMembers(): Observable<User[]> {
		this.initializeTeamMembersQuery();
		return this.membersQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).teamUsers),
				map(teamUsers => teamUsers.map(teamUser => teamUser.user))
		);
	}
}

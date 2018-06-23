import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TeamUser } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '../_interfaces/global.service';

import { TeamUserQueries } from './team-user.queries';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService implements GlobalServiceInterface<TeamUser> {
	queries = new TeamUserQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<TeamUser> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<TeamUser[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.teamUsers)
		);
	}

	update(status: TeamUser): Observable<TeamUser> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'TeamUser'
		}).pipe(
			first(),
			map(({ data }) => data.updateTeamUser)
		);
	}

	create(status: TeamUser): Observable<TeamUser> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: 'TeamUser'
		}).pipe(
			first(),
			map(({ data }) => data.createTeamUser)
		);
	}

	delete(teamUser: TeamUser): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(teamUser: TeamUser[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

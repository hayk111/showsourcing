import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PickATeamQueries } from '~features/pick-a-team/services/pick-a-team.queries';
import { map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Team } from '~models';
import { ApolloService } from '~shared/apollo';
import { ApolloClient } from '~shared/apollo';

@Injectable({
	providedIn: 'root'
})
export class PickATeamService {

	constructor(private apollo: ApolloClient, private apolloSrv: ApolloService) { }

	getTeams(): Observable<any[]> {
		return this.apollo.use('user').subscribe({ query: PickATeamQueries.selectTeams }).pipe(
			map(r => r.data.teams)
		);
	}

	createTeam(team: Team): Observable<any> {
		return this.apollo.use('user').update({
			mutation: PickATeamQueries.createTeam,
			input: {
				name: team.name,
				id: team.id,
				creationDate: team.creationDate,
				status: 'PENDING'
			},
			typename: 'User'
		}).pipe(
			tap(r => this.selectTeam(r.data.team))
		);
	}

	selectTeam(team: Team) {
		this.apolloSrv.selectTeam(team.id);
	}

	// waitForValidity(team: Team) {
	// 	this.apollo.subscribe({ query: })
	// }
}

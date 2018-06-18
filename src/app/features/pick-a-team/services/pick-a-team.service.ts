import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PickATeamQueries } from '~features/pick-a-team/services/pick-a-team.queries';
import { map, tap, switchMap } from 'rxjs/operators';
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
				status: 'pending'
			},
			typename: 'User'
		}).pipe(
			switchMap(_ => this.waitTeamValid(team)),
			tap(_ => this.selectTeam(team))
		);
	}

	selectTeam(team: Team) {
		this.apolloSrv.selectTeam(team.id);
	}


	waitTeamValid(team: Team) {
		return this.apollo.subscribe({
			query: PickATeamQueries.selectTeamValid,
			variables: { input: `id == "${team.id}"` }
		}).pipe(
			map(d => { debugger; })
		);
	}
}

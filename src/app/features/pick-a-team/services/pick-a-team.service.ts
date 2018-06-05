import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PickATeamQueries } from '~features/pick-a-team/services/pick-a-team.queries';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { uuid } from '~utils';
import { Team } from '~models';

@Injectable({
	providedIn: 'root'
})
export class PickATeamService {

	constructor(private apollo: Apollo) { }

	getTeams(): Observable<any[]> {
		return this.apollo.use('user').subscribe({ query: PickATeamQueries.selectTeams }).pipe(
			map(r => r.data.teams)
		);
	}

	createTeam(team: Team): Observable<any> {

		return this.apollo.use('user').mutate({
			mutation: PickATeamQueries.createTeam,
			variables: {
				input: {
					name: team.name,
					id: team.id,
					creationDate: team.creationDate,
					realmUri: `realm://ros-dev.showsourcing.com:9080/team/${team.id}`
				}
			}
		});
	}
}

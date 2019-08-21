import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { TeamUserQueries } from '~entity-services/team-user/team-user.queries';
import { TeamUser } from '~models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TeamService } from '../team/team.service';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(protected apolloState: ApolloStateService, protected http: HttpClient, protected teamSrv: TeamService) {
		super(apolloState, TeamUserQueries, 'teamUser', 'teamUsers');
	}

	update(teamUser: TeamUser) {
		return this.http.patch<TeamUser>(`${environment.apiUrl}/team/${this.teamSrv.selectedTeamSync.id}/team-role`, teamUser);
	}
}

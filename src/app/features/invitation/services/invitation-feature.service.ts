import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { TeamService, UserService, InvitationService } from '~entity-services';
import { Invitation } from '~models';

@Injectable({ providedIn: 'root' })
export class InvitationFeatureService extends InvitationService {

	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected teamSrv: TeamService,
		protected http: HttpClient
	) {
		super(apolloState);
	}

	acceptInvitation(invitation: Invitation) {
		return this.userSrv.selectUser().pipe(
			take(1),
			map(user => ({
				...invitation,
				status: 'accepted'
			})),
			switchMap(invit => this.create(invit, Client.USER)),
			switchMap(invit => this.teamSrv.waitForOne(`id == "${invit.teamId}"`, undefined, Client.USER)),
			switchMap(team => this.teamSrv.pickTeam(team))
		);
	}

	refuseInvitation(invitation: Invitation) {
		return this.userSrv.selectUser().pipe(
			take(1),
			map(user => ({
				...invitation,
				status: 'refused'
			})),
			switchMap(invit => this.create(invit, Client.USER))
		);
	}

}

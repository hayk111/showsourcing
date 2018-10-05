import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { InvitationUser } from '~models';

import { InvitationUserService, UserService, TeamService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~shared/apollo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class InvitationFeatureService extends InvitationUserService {

	constructor(
		protected apolloState: ApolloStateService,
		private invitationSrv: InvitationUserService,
		protected userSrv: UserService,
		protected teamSrv: TeamService,
		protected http: HttpClient
	) {
		super(apolloState);
	}

	getInvitation(id: string): Observable<InvitationUser> {
		return this.http.get<InvitationUser>(
			`${environment.apiUrl}/token/invitation/${id}`
		);
	}

	acceptInvitation(invitation: InvitationUser) {
		return this.userSrv.selectUser().pipe(
			take(1),
			map(user => ({
				...invitation,
				userId: user.id,
				status: 'accepted'
			})),
			switchMap(invit => this.invitationSrv.create(invit, 'id, teamId', Client.USER)),
			switchMap(invit => this.teamSrv.waitForOne(`id == "${invit.teamId}"`, undefined, Client.USER)),
			switchMap(team => this.teamSrv.pickTeam(team))
		);
	}

	refuseInvitation(invitation: InvitationUser) {
		return this.userSrv.selectUser().pipe(
			take(1),
			map(user => ({
				...invitation,
				userId: user.id,
				status: 'refused'
			})),
			switchMap(invit => this.invitationSrv.create(invit, undefined, Client.USER))
		);
	}

}

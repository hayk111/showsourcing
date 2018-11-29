import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { InvitationUserService, TeamService, UserService } from '~entity-services';
import { InvitationUser } from '~models';
import { ApolloStateService } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';

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
			switchMap(invit => this.invitationSrv.create(invit, Client.USER)),
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
			switchMap(invit => this.invitationSrv.create(invit, Client.USER))
		);
	}

}

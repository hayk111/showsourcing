import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { InvitationUser } from '~models';

import { InvitationUserService, UserService, TeamService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~shared/apollo';

@Injectable()
export class InvitationFeatureService extends InvitationUserService {

	constructor(
		protected apolloState: ApolloStateService,
		private invitationSrv: InvitationUserService,
		protected userSrv: UserService,
		protected teamSrv: TeamService
	) {
		super(apolloState);
	}

	getInvitation(id: string): Observable<{ invitation: InvitationUser; client: Client }> {
		// try to find first the inviation into USER
		return this.queryOne(id, null, Client.USER).pipe(
			switchMap((invitation: InvitationUser) => {
				if (invitation && invitation.id) { // if an invitation is found, return it
					return of({ invitation, client: Client.USER });
				} else { // if no invitation found, try to find it into ALL_USER
					return this.queryOne(id, null, Client.ALL_USER).pipe(
						map((invit: InvitationUser) => ({ invitation: invit, client: Client.ALL_USER }))
					);
				}
			})
		);
	}

	acceptInvitation(id: string, teamId: string, client: Client) {
		return this.userSrv.selectUser().pipe(
			switchMap(user => {
				return this.invitationSrv.update((client === Client.ALL_USER) ? {
					id, status: 'accepted',
					userId: user.id
				} : {
					id, status: 'accepted',
				}, null, client);
			}),
			switchMap(() => this.waitForOne(`id == "${teamId}"`)),
			switchMap(team => this.teamSrv.pickTeam(team))
		);
	}

	refuseInvitation(id: string, client: Client) {
		return this.invitationSrv.delete(id, client);
	}

}

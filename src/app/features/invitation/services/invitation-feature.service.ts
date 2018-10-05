import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
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
		return this.http.get<InvitationUser>(`${environment.apiUrl}/token/invitation/${id}`).pipe(
			tap(d => { debugger; })
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

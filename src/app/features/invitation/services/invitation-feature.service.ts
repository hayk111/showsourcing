import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloStateService } from '~core/apollo';
import { InvitationUserService, TeamService, UserService } from '~entity-services';
import { InvitationUser } from '~models';

@Injectable({ providedIn: 'root' })
export class InvitationFeatureService extends InvitationUserService {

	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected teamSrv: TeamService,
		protected http: HttpClient
	) {
		super(apolloState);
	}

	getInvitation(id: string): Observable<InvitationUser> {
		return this.http.get<InvitationUser>(`api/invitation/${id}`);
	}

	acceptInvitation(invitation: InvitationUser) {
		return this.changeStatusInvitation(invitation.id, 'accept');
	}

	refuseInvitation(invitation: InvitationUser) {
		return this.changeStatusInvitation(invitation.id, 'reject');
	}

	private changeStatusInvitation(invitationId: string, status: 'accept' | 'reject') {
		return this.http.post(`api/invitation/${invitationId}/${status}`, {});
	}

}

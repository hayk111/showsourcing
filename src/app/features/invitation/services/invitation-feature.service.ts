import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationUser, InvitationUserService, TeamService, UserService } from '~core/erm';

@Injectable({ providedIn: 'root' })
export class InvitationFeatureService extends InvitationUserService {

	constructor(

		protected userSrv: UserService,
		protected teamSrv: TeamService,
		protected http: HttpClient
	) {
		super();
	}

	getInvitation(id: string): Observable<InvitationUser> {
		return this.http.get<InvitationUser>(`api/invitation/${id}`);
	}

	acceptInvitation(invitationId: string) {
		return this.changeStatusInvitation(invitationId, 'accept');
	}

	refuseInvitation(invitationId: string) {
		return this.changeStatusInvitation(invitationId, 'reject');
	}

	private changeStatusInvitation(invitationId: string, status: 'accept' | 'reject') {
		return this.http.post(`api/invitation/${invitationId}/${status}`, {});
	}

}

import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, catchError } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { environment } from 'environments/environment';
import { UserService } from '~global-services';
import { Invitation } from '~models';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';


@Component({
	selector: 'handle-invitation-app',
	templateUrl: './handle-invitation.component.html',
	styleUrls: ['./handle-invitation.component.scss'],
})
export class HandleInvitationComponent extends AutoUnsub implements OnInit {
	connected: boolean; // = true;
	invitation: Invitation;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private userSrv: UserService,
		private invitationSrv: InvitationFeatureService) {
		super();
		this.connected = !!this.userSrv.userSync;

		const invitationId = route.snapshot.params.id;
		if (this.connected) {
			this.invitationSrv.selectOne(invitationId).subscribe(invitation => this.invitation = invitation);
		}
	}

	ngOnInit() {

	}

	getCurrentPath() {
		return this.location.path();
	}

	joinTeam() {
		this.invitationSrv.update({
			id: this.invitation.id,
			status: 'accepted'
		}).subscribe(() => {
			this.router.navigateByUrl('/');
		});
	}

	refuseInvitation() {
		this.invitationSrv.delete(this.invitation.id).subscribe(() => {
			this.router.navigateByUrl('/');
		});
	}

}

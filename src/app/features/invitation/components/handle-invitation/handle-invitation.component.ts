import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, catchError, tap, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { environment } from 'environments/environment';
import { UserService } from '~global-services';
import { Invitation } from '~models';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';
import { Client } from '~shared/apollo/services/apollo-client-names.const';


@Component({
	selector: 'handle-invitation-app',
	templateUrl: './handle-invitation.component.html',
	styleUrls: ['./handle-invitation.component.scss'],
})
export class HandleInvitationComponent extends AutoUnsub implements OnInit {
	connected: boolean;
	invitation: Invitation;
	client: Client;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private userSrv: UserService,
		private invitationSrv: InvitationFeatureService,
		private cdr: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.connected = !!this.userSrv.selectUser().pipe(
			takeUntil(this._destroy$),
			tap(() => this.connected = true),
			switchMap(() => {
				const invitationId = this.route.snapshot.params.id;
				return this.invitationSrv.getInvitation(invitationId);
			})
		).subscribe(({ invitation, client }) => {
			if (invitation.id) {
				// An invitation is found
				this.invitation = invitation;
				this.client = client;
				this.cdr.detectChanges();
			} else {
				// If no invitation found, redirect to /
				this.router.navigateByUrl('/');
			}
		});
	}

	getCurrentPath() {
		return this.location.path();
	}

	joinTeam() {
		this.invitationSrv.acceptInvitation(this.invitation.id, this.client).subscribe(() => {
			this.router.navigateByUrl('/');
		});
	}

	refuseInvitation() {
		this.invitationSrv.refuseInvitation(this.invitation.id, this.client).subscribe(() => {
			this.router.navigateByUrl('/');
		});
	}

}

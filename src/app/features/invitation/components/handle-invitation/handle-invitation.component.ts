import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';
import { InvitationUser } from '~models';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';
import { TeamService } from '~core/entity-services';
import { TeamClientInitializer } from '~core/apollo';


@Component({
	selector: 'handle-invitation-app',
	templateUrl: './handle-invitation.component.html',
	styleUrls: ['./handle-invitation.component.scss'],
})
export class HandleInvitationComponent extends AutoUnsub implements OnInit {
	authenticated$: Observable<boolean>;
	invitation$: Observable<InvitationUser>;
	client: Client;
	returnUrl: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private authSrv: AuthenticationService,
		private invitationSrv: InvitationFeatureService,
		private teamSrv: TeamService,
		private notifSrv: NotificationService,
		private teamClient: TeamClientInitializer
	) {
		super();
	}

	ngOnInit() {
		const invitationId = this.route.snapshot.params.id;
		this.authenticated$ = this.authSrv.isAuthenticated$;
		this.invitation$ = this.authenticated$.pipe(
			switchMap(_ => this.invitationSrv.getInvitation(invitationId))
		);

		this.returnUrl = this.location.path();
	}

	accept(invitation: InvitationUser) {
		this.teamClient.setPending('switching team');
		this.invitationSrv.acceptInvitation(invitation).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.notifSrv.add({
				type: NotificationType.SUCCESS,
				title: 'Invitation Accepted',
				message: 'The invitation was accepted',
				timeout: 3500
			});
		});
	}

	refuse(invitation) {
		this.invitationSrv.refuseInvitation(invitation).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: 'Invitation Refused',
				message: 'The invitation was refused',
				timeout: 3500
			});
		});
	}

}

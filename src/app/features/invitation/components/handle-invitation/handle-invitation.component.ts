import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeamClientInitializer } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, translate } from '~utils';
import { TeamService } from '~core/entity-services';
import { Invitation } from '~core/models';


@Component({
	selector: 'handle-invitation-app',
	templateUrl: './handle-invitation.component.html',
	styleUrls: ['./handle-invitation.component.scss'],
})
export class HandleInvitationComponent extends AutoUnsub implements OnInit {

	authenticated$: Observable<boolean>;
	invitation$: Observable<Invitation>;
	client: Client;
	returnUrl: string;

	// this is used to hide then DOM when accepting in the meaintime we fix how we handle
	// the spinner located at `app.component.html`
	hasAccepted$ = new BehaviorSubject(false);

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private authSrv: AuthenticationService,
		private invitationSrv: InvitationFeatureService,
		private notifSrv: NotificationService,
		private teamClient: TeamClientInitializer
	) {
		super();
	}

	ngOnInit() {
		const invitationId = this.route.snapshot.params.id;
		this.authenticated$ = this.authSrv.isAuthenticated$;
		this.invitation$ = this.authenticated$.pipe(
			switchMap(_ => this.invitationSrv.queryOne(invitationId))
		);
		this.returnUrl = this.location.path();
	}

	accept(invitation: Invitation) {
		this.hasAccepted$.next(true);
		this.teamClient.setPending('switching team');
		this.invitationSrv.acceptInvitation(invitation).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.notifSrv.add({
				type: NotificationType.SUCCESS,
				title: translate('Invitation accepted'),
				message: translate('The invitation was accepted'),
				timeout: 3500
			});
		});
	}

	refuse(invitation) {
		this.invitationSrv.refuseInvitation(invitation).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: translate('Invitation Refused'),
				message: translate('The invitation was refused'),
				timeout: 3500
			});
		});
	}

}

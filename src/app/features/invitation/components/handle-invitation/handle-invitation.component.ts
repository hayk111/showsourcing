import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeamClientInitializer } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';
import { InvitationUser } from '~models';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';
import { TranslateService } from '@ngx-translate/core';


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
	invitationId: string;

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
		private teamClient: TeamClientInitializer,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		this.invitationId = this.route.snapshot.params.id;
		this.authenticated$ = this.authSrv.isAuthenticated$;
		this.invitation$ = this.authenticated$.pipe(
			switchMap(_ => this.invitationSrv.getInvitation(this.invitationId))
		);
		this.returnUrl = this.location.path();
	}

	accept() {
		this.hasAccepted$.next(true);
		this.teamClient.setPending('switching team');
		this.invitationSrv.acceptInvitation(this.invitationId).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.notifSrv.add({
				type: NotificationType.SUCCESS,
				title: this.translate.instant('title.invitation-accepted'),
				message: this.translate.instant('message.invitation-accepted'),
				timeout: 3500
			});
		});
	}

	refuse() {
		this.invitationSrv.refuseInvitation(this.invitationId).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: this.translate.instant('title.invitation-refused'),
				message: this.translate.instant('message.invitation-refused'),
				timeout: 3500
			});
		});
	}

}

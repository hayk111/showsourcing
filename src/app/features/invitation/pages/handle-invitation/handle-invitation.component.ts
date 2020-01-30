import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeamClientInitializer } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { InvitationFeatureService } from '~features/invitation/services/invitation-feature.service';
import { InvitationUser } from '~core/ORM/models';
import { ToastService, ToastType } from '~shared/toast';
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
		private toastSrv: ToastService,
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
			this.toastSrv.add({
				type: ToastType.SUCCESS,
				title: 'title.invitation-accepted',
				message: 'message.invitation-accepted',
				timeout: 3500
			});
		});
	}

	refuse() {
		this.invitationSrv.refuseInvitation(this.invitationId).subscribe(_ => {
			this.router.navigateByUrl('/');
			this.toastSrv.add({
				type: ToastType.ERROR,
				title: 'title.invitation-refused',
				message: 'message.invitation-refused',
				timeout: 3500
			});
		});
	}

}

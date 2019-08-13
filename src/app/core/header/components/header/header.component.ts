import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { DEFAULT_REPLIED_STATUS, Team, User } from '~core/models';
import { SupplierRequestService, TeamService, UserService } from '~entity-services';
import { ActivityService } from '~common/activity/services/activity.service';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;
	requestCount$: Observable<number>;
	notification$: Observable<unknown>;
	isProd = environment.production;

	constructor(
		private authSrv: AuthenticationService,
		private userSrv: UserService,
		private requestSrv: SupplierRequestService,
		private teamSrv: TeamService,
		private activitySrv: ActivityService
		) { }

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamSrv.teamSelected$;
		this.requestCount$ = this.requestSrv.selectCount(
			`status == "${DEFAULT_REPLIED_STATUS}" AND senderTeamId == "${this.teamSrv.selectedTeamSync.id}"`
		);
		this.notification$ = this.activitySrv.getNotifications();
		this.activitySrv.getRealTimeNotifications().subscribe(() => this.notification$ = this.activitySrv.getNotifications());

	}

	logout() {
		this.authSrv.logout();
	}

}

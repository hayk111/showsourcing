import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { DEFAULT_REPLIED_STATUS, Team, User } from '~core/ORM/models';
import { SupplierRequestService, TeamService, UserService } from '~entity-services';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

import { sideNavItems } from './side-nav-items.const';

@Component({
	selector: 'sidebar-app',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;
	requestCount$: Observable<number>;
	notifications$: Observable<GetStreamNotification>;
	isProd = environment.production;
	isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
	sideNavItems = sideNavItems;

	constructor(
		private authSrv: AuthenticationService,
		private userSrv: UserService,
		private requestSrv: SupplierRequestService,
		private teamSrv: TeamService,
		private notifActivitySrv: NotificationActivityService) { }

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamSrv.teamSelected$;
		this.requestCount$ = this.requestSrv.selectCount(
			`status == "${DEFAULT_REPLIED_STATUS}" AND senderTeamId == "${this.teamSrv.selectedTeamSync.id}"`
		);
		this.notifications$ = this.notifActivitySrv.getNotifications();
	}

	openNotifPanel() {
		this.notifActivitySrv.openNotificationPanel();
	}

	logout() {
		this.authSrv.logout();
	}

}

import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { DEFAULT_REPLIED_STATUS, Team, User } from '~core/erm';
import { SupplierRequestService, TeamService, UserService } from '~core/erm';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';

import { sideNavItems } from './side-nav-items.const';

@Component({
	selector: 'sidebar-app',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	user$: Observable<User> = of(null);
	team$: Observable<Team> = of(null);
	requestCount$: Observable<number> = of(null);
	notifications$: Observable<GetStreamNotification> = of(null);
	isProd = environment.production;
	isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
	sideNavItems = sideNavItems;

	constructor(private authSrv: AuthenticationService) { }

	ngOnInit() {

	}

	openNotifPanel() {
		// this.notifActivitySrv.openNotificationPanel();
	}

	logout() {
		this.authSrv.signOut();
	}

}

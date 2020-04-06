import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { Team, User } from '~core/erm';
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

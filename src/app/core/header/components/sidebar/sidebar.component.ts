import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { DEFAULT_REPLIED_STATUS, Team, User } from '~core/models';
import { SupplierRequestService, TeamService, UserService } from '~entity-services';
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
	isProd = environment.production;
	sideNavItems = sideNavItems;

	constructor(
		private authSrv: AuthenticationService,
		private userSrv: UserService,
		private requestSrv: SupplierRequestService,
		private teamSrv: TeamService) { }

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamSrv.teamSelected$;
		this.requestCount$ = this.requestSrv.selectCount(
			`status == "${DEFAULT_REPLIED_STATUS}" AND senderTeamId == "${this.teamSrv.selectedTeamSync.id}"`
		);
	}

	logout() {
		this.authSrv.logout();
	}

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { DEFAULT_REPLIED_STATUS, Team, User } from '~core/models';
import { SupplierRequestService, TeamService, UserService } from '~entity-services';
import { Router } from '@angular/router';
import { translate } from '~utils';

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
	navItems: any[];
	hoverIndex: boolean;
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
		this.navItems = [{
			icon: 'product',
			link: ['/product'],
			children: [{
				icon: 'product',
				label: translate('products')
			},
			{
				icon: 'sample',
				label: translate('samples')
			},
			{
				icon: 'kanban',
				label: translate('boards')
			}]
		},
		{
			icon: 'supplier',
			link: ['/supplier']
		},
		{
			icon: 'project',
			link: ['/project']
		},
		{
			icon: 'check-round',
			link: ['/workspace']
		},
		{
			icon: 'envelope',
			link: ['/request'],
			notifBadge: true
		}
	];
	}

	logout() {
		this.authSrv.logout();
	}

	hoverItem(index) {
		this.hoverIndex = index;
	}

}

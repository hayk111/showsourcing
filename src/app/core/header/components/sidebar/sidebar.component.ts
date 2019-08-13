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
			icon: 'assets/icons/product-sidebar.svg',
			link: ['/product'],
			children: [{
				icon: 'assets/icons/product-sidebar.svg',
				label: translate('products')
			},
			{
				icon: 'assets/icons/product-sidebar.svg',
				label: translate('samples')
			},
			{
				icon: 'assets/icons/product-sidebar.svg',
				label: translate('boards')
			}]
		},
		{
			icon: 'assets/icons/product-sidebar.svg',
			link: ['/project']
		},
		{
			icon: 'assets/icons/product-sidebar.svg',
			link: ['/supplier']
		},
		{
			icon: 'assets/icons/product-sidebar.svg',
			link: ['/workspace']
		},
		{
			icon: 'assets/icons/product-sidebar.svg',
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

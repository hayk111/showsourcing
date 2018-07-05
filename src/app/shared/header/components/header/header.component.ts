import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { UserService, TeamService } from '../../../../global-services';
import { User } from '~models/user.model';
import { AutoUnsub } from '~utils';
import { Team } from '~models';

@Component({
	selector: 'header-app',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AutoUnsub implements OnInit {
	user$: Observable<User>;
	team$: Observable<Team>;

	constructor(
		private authSrv: AuthenticationService,
		private userSrv: UserService,
		private teamSrv: TeamService) {
		super();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamSrv.selectedTeam$;
	}

	logout() {
		this.authSrv.logout();
	}
}

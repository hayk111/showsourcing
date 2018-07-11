import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { User } from '~models/user.model';
import { AutoUnsub } from '~utils';
import { Team } from '~models';

import { UserService } from '~global-services';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';

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
		private teamPickerSrv: TeamPickerService) {
		super();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.team$ = this.teamPickerSrv.selectedTeam$;
	}

	logout() {
		this.authSrv.logout();
	}
}

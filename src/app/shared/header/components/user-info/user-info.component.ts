import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '~models';
import { Team } from '~models';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { UserService } from '~features/user';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'user-info-app',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent extends AutoUnsub implements OnInit {
	user$: Observable<User>;
	teams$: Observable<Array<Team>>;
	/** Whether the user menu is visible */
	panelVisible = false;
	/** whether the team picker is visible */
	teamPickerShown = false;

	constructor(private authSrv: AuthenticationService, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.teams$ = this.userSrv.selectTeams();
	}

	openTeamPicker() {
		this.teamPickerShown = true;
	}

	pickTeam(team) {
		this.userSrv.pickTeam(team);
	}

	closeTeamPicker() {
		this.teamPickerShown = false;
	}

	openPanel() {
		this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}

	logout() {
		this.authSrv.logout();
	}
}

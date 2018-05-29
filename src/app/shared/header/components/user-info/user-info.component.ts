import { Component, OnInit } from '@angular/core';

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
})
export class UserInfoComponent extends AutoUnsub implements OnInit {
	user: User;
	teams$: Observable<Array<Team>>;
	/** Whether the user menu is visible */
	panelVisible = false;
	/** whether the team picker is visible */
	teamPickerShown = false;

	constructor(private authSrv: AuthenticationService, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.userSrv.user$.pipe(
			takeUntil(this._destroy$)
		).subscribe(user => this.user = user);
	}

	openTeamPicker() {
		this.teamPickerShown = true;
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

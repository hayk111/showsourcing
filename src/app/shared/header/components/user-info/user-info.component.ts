import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '~models';
import { AuthActions } from '~app/features/auth';
import { Team } from '~models';

@Component({
	selector: 'user-info-app',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
	user$: Observable<User>;
	teams$: Observable<Array<Team>>;
	/** Whether the user menu is visible */
	panelVisible = false;
	/** whether the team picker is visible */
	teamPickerShown = false;

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
		// this.user$ = this.store.select(selectUser);
		// this.teams$ = this.store.select(fromTeam.selectArray);
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
		this.store.dispatch(AuthActions.logout());
	}
}

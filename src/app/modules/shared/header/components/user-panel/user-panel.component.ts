import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../store/action/user.action';
import { AuthActions } from '../../../../store/action/authentication.action';
import { Router } from '@angular/router';

@Component({
	selector: 'user-panel-app',
	templateUrl: './user-panel.component.html',
	styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
	}

	goToSettings() {

	}

	goToDataManagement() {
		this.router.navigate(['data-management']);
	}

	pickTeam() {

	}

	pickLanguage() {

	}

	sendFeedback() {

	}

	logout() {
		this.store.dispatch(AuthActions.logout());
	}

}

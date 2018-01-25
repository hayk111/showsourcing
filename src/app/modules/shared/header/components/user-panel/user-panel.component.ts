import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/action/misc/authentication.action';

@Component({
	selector: 'user-panel-app',
	templateUrl: './user-panel.component.html',
	styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	goToSettings() {

	}

	goToDataManagement() {

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

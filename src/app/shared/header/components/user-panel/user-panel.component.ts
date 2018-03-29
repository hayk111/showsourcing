import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '~auth/store';

@Component({
	selector: 'user-panel-app',
	templateUrl: './user-panel.component.html',
	styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() { }

	goToSettings() { }

	goToDataManagement() {
		this.router.navigate(['data-management']);
	}

	pickTeam() { }

	pickLanguage() { }

	sendFeedback() { }

	logout() {
		this.store.dispatch(AuthActions.logout());
	}
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '~auth/store';
import { User } from '~app/entity';
import { DEFAULT_NO_IMG } from '~app/app-root/utils';

@Component({
	selector: 'user-panel-app',
	templateUrl: './user-panel.component.html',
	styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
	@Input() user: User;
	@Output() logout = new EventEmitter<any>();
	defaultImg = DEFAULT_NO_IMG;
	constructor(private router: Router) { }

	ngOnInit() { }

	goToSettings() {
		this.router.navigate(['user', 'settings']);
	}

	goToDataManagement() {
		this.router.navigate(['data-management']);
	}

	pickTeam() { }

	pickLanguage() { }

	sendFeedback() { }

}

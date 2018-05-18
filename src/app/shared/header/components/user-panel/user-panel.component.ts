import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '~models';
import { DEFAULT_USER_IMG } from '~app/app-root/utils';

@Component({
	selector: 'user-panel-app',
	templateUrl: './user-panel.component.html',
	styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
	@Input() user: User;
	@Output() logout = new EventEmitter<any>();
	@Output() close = new EventEmitter<any>();
	defaultImg = DEFAULT_USER_IMG;
	constructor(private router: Router) { }

	ngOnInit() { }

	goToSettings() {
		this.router.navigate(['user', 'settings']);
		this.close.emit();
	}

	goToDataManagement() {
		this.router.navigate(['data-management']);
		this.close.emit();
	}

	pickTeam() {
		this.close.emit();
	}

	pickLanguage() {
		this.close.emit();
	}

	sendFeedback() {
		this.close.emit();
	}

}

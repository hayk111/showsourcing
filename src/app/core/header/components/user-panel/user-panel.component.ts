import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User, Team } from '~models';
import { DEFAULT_USER_ICON } from '~utils';

@Component({
	selector: 'user-panel-app',
	templateUrl: './user-panel.component.html',
	styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
	@Input() user: User;
	@Input() team: Team;
	@Output() logout = new EventEmitter<any>();
	@Output() close = new EventEmitter<any>();
	defaultImg = DEFAULT_USER_ICON;
	constructor(private router: Router) { }

	ngOnInit() { }

	goToSettings() {
		this.router.navigate(['settings', 'profile']);
		this.close.emit();
	}

	goToTeamManagement() {
		this.router.navigate(['settings', 'team', 'members']);
	}

	goToDataManagement() {
		this.router.navigate(['settings', 'data', 'category']);
		this.close.emit();
	}

	pickTeam() {
		this.router.navigateByUrl('/user/pick-a-team');
		this.close.emit();
	}

	pickLanguage() {
		this.close.emit();
	}

	sendFeedback() {
		this.close.emit();
	}

}

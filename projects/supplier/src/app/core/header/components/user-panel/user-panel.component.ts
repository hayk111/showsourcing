import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '~core/entity-services';
import { Team, User } from '~models';
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

	constructor(private router: Router, private teamSrv: TeamService) { }

	ngOnInit() { }

	goToProfile() {
		this.router.navigate(['settings', 'profile']);
		this.close.emit();
	}

	goToTeamManagement() {
		this.router.navigate(['settings', 'team', 'members']);
	}

	goToSettings() {
		this.router.navigate(['settings', 'data', 'category']);
		this.close.emit();
	}

	pickTeam() {
		this.teamSrv.resetSelectedTeam();
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

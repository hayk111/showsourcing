import { Component } from '@angular/core';

import { ERM } from '~core/erm';
import { CompanyService, TeamService } from '~core/auth/services';

@Component({
	selector: 'settings-page-app',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
	erm = ERM;
	teamName: string;
	companyName: string;
	constructor(public companySrv: CompanyService, public teamSrv: TeamService) {
		// this.teamSrv.teamSelected$.subscribe(team => {
		// 	this.teamName = team.name;
		// });
		// this.companySrv.company$.subscribe(company => {
		// 	this.companyName = company.name;
		// });
	}
}

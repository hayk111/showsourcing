import { Component } from '@angular/core';

import { ERM } from '~models';
import { CompanyService, TeamService } from '~core/entity-services';

@Component({
	selector: 'settings-page-app',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

	erm = ERM;
	teamName: string;
	companyName: string;
	constructor(
		public companySrv: CompanyService,
		public teamSrv: TeamService,
	) {
		this.teamName = this.teamSrv.selectedTeamSync.name;
		const company = this.companySrv.companySync;
		this.companyName =  company ? company.name : '';
	}
}

import { Component } from '@angular/core';

import { ERM } from '~models';
import { CompanyService, TeamService } from '~core/entity-services';

@Component({
	selector: 'settings-app',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

	erm = ERM;
	teamName: string;
	companyName: string;
	constructor(
		public companySrv: CompanyService,
		public teamSrv: TeamService,
	) {
		this.teamName = this.teamSrv.selectedTeamSync.name;
		this.companyName = this.companySrv.companySync.name;
	}
}

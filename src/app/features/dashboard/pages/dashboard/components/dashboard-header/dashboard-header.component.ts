import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TeamService, CompanyService } from '~core/orm/services';
import { environment } from 'environments/environment';

@Component({
	selector: 'dashboard-header-app',
	templateUrl: './dashboard-header.component.html',
	styleUrls: ['./dashboard-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent implements OnInit {

	companyName: string;
	teamName: string;
	isDev = !environment.production;
	version = environment.version;
	constructor(public teamSrv: TeamService, private companySrv: CompanyService) {
	}

	ngOnInit() {
		this.teamName = this.teamSrv.selectedTeamSync.name;
		const company = this.companySrv.companySync;
		this.companyName =  company ? company.name : '';
	}

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TeamService, CompanyService } from '~core/entity-services';

@Component({
	selector: 'dashboard-header-app',
	templateUrl: './dashboard-header.component.html',
	styleUrls: ['./dashboard-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent implements OnInit {

	companyName: string;
	teamName: string;
	constructor(public teamSrv: TeamService, private companySrv: CompanyService) {
	}

	ngOnInit() {
		this.teamName = this.teamSrv.selectedTeamSync.name;
		this.companyName = this.companySrv.companySync.name;
	}

}

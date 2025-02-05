import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService, CompanyService } from '~entity-services';
import { Team, User } from '~models';
import { DialogService } from '~shared/dialog/services';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

@Component({
	selector: 'company-page-app',
	templateUrl: './company-page.component.html',
	styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {
	companyName: string;
	owner: User;
	selectedTab = 'team-members';

	constructor(
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected router: Router,
		protected route: ActivatedRoute,
		private teamSrv: TeamService,
		private companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
	) { }

	ngOnInit() {
		this.companyName = this.companySrv.companySync.name;
		this.owner = this.companySrv.companySync.owner;
	}

	/** Displays specified tab */
	displayTab(tabName: string) {
		this.selectedTab = tabName;
	}

	/** Opens the dialog for creating a new team */
	redirectNewTeamScreen() {
		this.router.navigate(['auth', 'user', 'create-a-team']);
	}
}

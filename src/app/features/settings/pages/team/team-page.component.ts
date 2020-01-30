import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeamService, CompanyService } from '~core/erm/services';
import { Team } from '~core/erm/models';
import { DialogService } from '~shared/dialog/services';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

@Component({
	selector: 'team-page-app',
	templateUrl: './team-page.component.html',
	styleUrls: ['./team-page.component.scss'],
	host: {
		class: 'table-page'
	},
})
export class TeamPageComponent implements OnInit {
	team$: Observable<Team>;
	team: Team;
	companyName: string;
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
		this.team$ = this.teamSrv.selectTeam();
		this.team = this.teamSrv.selectedTeamSync;
		const company = this.companySrv.companySync;
		this.companyName =  company ? company.name : '';
	}

	/** Displays specified tab */
	displayTab(tabName: string) {
		this.selectedTab = tabName;
	}

	/** Opens the dialog for creating a new team */
	redirectNewTeamScreen() {
		this.router.navigate(['auth', 'user', 'create-a-team']);
	}
	updateTeamName(newName: string) {
		// 	if (newName.length) {
		// 		this.team$.pipe(
		// 			switchMap(team => this.teamSrv.update(team))
		// 		).subscribe();
		// 	}
	}
}


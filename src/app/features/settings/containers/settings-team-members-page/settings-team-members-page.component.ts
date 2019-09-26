import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TeamService, CompanyService } from '~entity-services';
import { Team } from '~models';
import { DialogService } from '~shared/dialog/services';
import { CommonModalService } from '~common/modals/services/common-modal.service';

@Component({
	selector: 'settings-team-members-page-app',
	templateUrl: './settings-team-members-page.component.html',
	styleUrls: ['./settings-team-members-page.component.scss']
})
export class SettingsTeamMembersPageComponent implements OnInit {
	team: Team;
	companyName: string;
	selectedTab = 'team-members';

	constructor(
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected router: Router,
		protected route: ActivatedRoute,
		private teamSrv: TeamService,
		private companySrv:  CompanyService,
		public commonModalSrv:  CommonModalService,
	) { }

	ngOnInit() {
		this.team = this.teamSrv.selectedTeamSync;
		this.companyName = this.companySrv.companySync.name;
	}

	/** Displays specified tab */
	displayTab(tabName: string) {
		this.selectedTab = tabName;
	}

	/** Opens the dialog for creating a new team */
	redirectNewTeamScreen() {
		this.router.navigate(['user', 'create-a-team']);
	}
	updateTeamName(newName: string) {
		if (newName.length) {
			this.team$.pipe(
				switchMap(team => this.teamSrv.update(team))
			).subscribe();
		}
	}
}

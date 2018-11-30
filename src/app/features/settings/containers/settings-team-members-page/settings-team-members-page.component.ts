import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TeamService } from '~global-services';
import { Team } from '~models';
import { take, switchMap } from 'rxjs/operators';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'settings-team-members-page-app',
	templateUrl: './settings-team-members-page.component.html',
	styleUrls: ['./settings-team-members-page.component.scss']
})
export class SettingsTeamMembersPageComponent implements OnInit {
	team$: Observable<Team>;
	selectedTab = 'team-members';

	constructor(
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		protected router: Router,
		protected route: ActivatedRoute,
		private teamSrv: TeamService
	) {}

	ngOnInit() {
		this.team$ = this.teamSrv.teamSelected$;
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

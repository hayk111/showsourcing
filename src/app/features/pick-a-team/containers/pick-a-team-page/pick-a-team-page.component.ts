import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '~models';
import { TeamService } from '~global-services';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent implements OnInit {
	teams$: Observable<Team[]>;
	form: FormGroup;

	constructor(private teamSrv: TeamService, private router: Router) { }

	ngOnInit() {
		this.teams$ = this.teamSrv.teams$;
	}

	pickTeam(team: Team) {
		this.teamSrv.pickTeam(team);
	}
}

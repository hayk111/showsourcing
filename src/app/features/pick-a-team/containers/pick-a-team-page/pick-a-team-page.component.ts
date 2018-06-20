import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '~models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamService } from '~shared/global-services';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent implements OnInit {
	teams$: Observable<Team[]>;
	form: FormGroup;

	constructor(private fb: FormBuilder, private srv: TeamService, private router: Router) {

	}

	ngOnInit() {
		this.teams$ = this.srv.selectTeams();
	}


	selectTeam(team: Team) {
		this.srv.pickTeam(team)
			.subscribe(_ => this.router.navigate(['']));
	}
}

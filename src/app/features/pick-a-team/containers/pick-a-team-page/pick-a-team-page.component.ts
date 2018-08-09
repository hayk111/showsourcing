import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';
import { Team } from '~models';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent implements OnInit {
	teams$: Observable<Team[]>;
	form: FormGroup;

	constructor(private teamPicker: TeamPickerService, private router: Router) { }

	ngOnInit() {
		this.teams$ = this.teamPicker.teams$;
	}

	selectTeam(team: Team) {
		this.teamPicker.pickTeam(team).subscribe(_ => {
			this.router.navigate(['']);
		});
	}
}

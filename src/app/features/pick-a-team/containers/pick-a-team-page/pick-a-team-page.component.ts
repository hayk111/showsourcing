import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PickATeamService } from '~features/pick-a-team/services/pick-a-team.service';
import { Team } from '~models';
import { Router } from '@angular/router';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent {
	form: FormGroup;
	pending = false;
	error: string;

	constructor(private fb: FormBuilder, private srv: PickATeamService, private router: Router) {
		this.form = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {
		this.pending = true;
		this.srv.createTeam(new Team(this.form.value)).subscribe(
			_ => {
				this.pending = false;
				this.router.navigate(['']);
			},
			e => {
				this.error = 'We had an error creating your team. Please try again.';
			}
		);
	}

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PickATeamService } from '~features/pick-a-team/services/pick-a-team.service';
import { Router } from '@angular/router';
import { Team } from '~models';

@Component({
	selector: 'create-a-team-page-app',
	templateUrl: './create-a-team-page.component.html',
	styleUrls: ['./create-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateATeamPageComponent {
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

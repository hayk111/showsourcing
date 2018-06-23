import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '~models';
import { TeamService } from '../../../../global-services';

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

	constructor(private fb: FormBuilder, private srv: TeamService, private router: Router) {
		this.form = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {
		this.pending = true;
		const team = new Team(this.form.value);
		this.srv.createTeam(team)
			.subscribe(
				_ => {
					this.pending = false;
					this.router.navigate(['']);
				},
				e => {
					this.pending = false;
					this.error = 'We had an error creating your team. Please try again.';
				}
			);
	}

}

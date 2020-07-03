import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from '~core/auth';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'create-a-team-page-app',
	templateUrl: './create-a-team-page.component.html',
	styleUrls: ['./create-a-team-page.component.scss', '../../../shared/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateATeamPageComponent {

	form = this.fb.group({
		name: ['', Validators.required]
	});
	pending$ = new BehaviorSubject(false);
	error: string;

	constructor(
		private fb: FormBuilder,
		private teamSrv: TeamService,
		private router: Router
	) { }

	onSubmit() {
		if (this.form.valid) {
			const name = this.form.value.name;
			this.teamSrv.create(name).pipe(
				switchMap(_team => this.teamSrv.pickTeam(_team))
			).subscribe(_ => this.router.navigate(['']));
		}
	}


}

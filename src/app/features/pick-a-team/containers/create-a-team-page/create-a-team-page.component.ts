import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '~models';
import { TeamService, UserService, CompanyService } from '~global-services';
import { map, first, tap } from 'rxjs/operators';
import { Company } from '~models/company.model';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'create-a-team-page-app',
	templateUrl: './create-a-team-page.component.html',
	styleUrls: ['./create-a-team-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateATeamPageComponent implements OnInit {
	form: FormGroup;
	pending = false;
	error: string;
	hasTeam$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private srv: TeamService,
		private companySrv: CompanyService,
		private router: Router,
		private userSrv: UserService
	) {
		this.form = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {
		this.pending = true;
		const formValue = this.form.value;
		const company: Company = { id: this.companySrv.companySync.id };
		const team = new Team({ name: formValue.teamName, company, ownerUser: this.userSrv.userSync });
		this.srv.create(team)
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

	ngOnInit() {
		this.hasTeam$ = this.srv.selectAll().pipe(
			first(),
			map(all => all.length > 0)
		);

	}

}

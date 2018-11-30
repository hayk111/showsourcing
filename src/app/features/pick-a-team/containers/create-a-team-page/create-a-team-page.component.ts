import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CompanyService, TeamService, UserService } from '~entity-services';
import { Team } from '~models';
import { Company } from '~models/company.model';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'create-a-team-page-app',
	templateUrl: './create-a-team-page.component.html',
	styleUrls: ['./create-a-team-page.component.scss', '../../../auth-pages/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateATeamPageComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending = false;
	error: string;
	hasTeam$: Observable<boolean>;
	returnUrl: string;

	constructor(
		private fb: FormBuilder,
		private srv: TeamService,
		private companySrv: CompanyService,
		private router: Router,
		private userSrv: UserService,
		private route: ActivatedRoute
	) {
		super();
		this.form = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {
		this.pending = true;
		const formValue = this.form.value;
		// we a
		const company: Company = { id: this.companySrv.companySync.id };
		const team = new Team({ name: formValue.name, company, ownerUser: this.userSrv.userSync });
		this.srv.create(team)
			.subscribe(
				_ => {
					this.router.navigateByUrl(this.returnUrl);
					this.pending = false;
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
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

}

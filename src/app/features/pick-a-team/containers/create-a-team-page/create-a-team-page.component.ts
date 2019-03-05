import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CompanyService, TeamService, UserService } from '~entity-services';
import { AuthFormButton, AuthFormElement } from '~features/auth-pages/components/auth-form-base/auth-form';
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
	pending = false;
	error: string;
	hasTeam$: Observable<boolean>;
	returnUrl: string;

	listForm: AuthFormElement[];
	@Input() buttons: AuthFormButton[];

	constructor(
		private fb: FormBuilder,
		private srv: TeamService,
		private companySrv: CompanyService,
		private router: Router,
		private userSrv: UserService,
		private route: ActivatedRoute
	) {
		super();
		this.listForm = [{
			label: 'Team Name',
			type: 'text',
			name: 'name',
			isRequired: true,
			placeHolder: '',
			validators: [Validators.required]
		}];
		this.buttons = [{
			label: 'Create a new team',
			type: 'button'
		}];
	}

	onSubmit(form: FormGroup) {
		this.pending = true;
		const formValue = form.value;
		const company: Company = { id: this.companySrv.companySync.id };
		const team = new Team({ name: formValue.name, company, ownerUser: { id: this.userSrv.userSync.id } });
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
		this.srv.selectAll().pipe(
			first()
		).subscribe(all => {
			if (all.length > 0) {
				this.buttons = [...this.buttons, {
					label: 'Select a team Instead',
					type: 'link',
					link: '../pick-a-team'
				}];
			}
		});
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService, UserService, TeamService } from '~entity-services';
import { map, first, mergeMap } from 'rxjs/operators';
import { Company, Team } from '~models';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFormElement, AuthFormButton } from '~features/auth-pages/components/auth-form-base/auth-form';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'create-a-company-page-app',
	templateUrl: './create-a-company-page.component.html',
	styleUrls: ['./create-a-company-page.component.scss', '../../../auth-pages/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateACompanyPageComponent extends AutoUnsub implements OnInit {
	pending = false;
	error: string;
	returnUrl: string;

	listForm: AuthFormElement[];
	@Input() buttons: AuthFormButton[];

	constructor(
		private fb: FormBuilder,
		private srv: CompanyService,
		private teamService: TeamService,
		private router: Router,
		private userSrv: UserService,
		private route: ActivatedRoute
	) {
		super();
		this.listForm = [{
			label: 'Company Name',
			type: 'text',
			name: 'companyName',
			isRequired: true,
			placeHolder: '',
			validators: [Validators.required]
		}, {
			label: 'Team Name',
			type: 'text',
			name: 'teamName',
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
		const company = new Company({ name: formValue.companyName });
		this.srv.create(company)
			.pipe(
				first(),
				mergeMap((company: Company) => {
					const team = new Team({ name: formValue.teamName, company, ownerUser: this.userSrv.userSync });
					return this.teamService.create(team);
				})
			)
			.subscribe(
				_ => {
					this.router.navigateByUrl(this.returnUrl);
					this.pending = false;
				},
				e => {
					this.pending = false;
					this.error = 'We had an error creating your company. Please try again.';
				}
			);
	}

	ngOnInit() {
		this.srv.selectAll().pipe(
			first()
		).subscribe(all => {
			if (all.length > 0) {
				this.buttons = [...this.buttons, {
					label: 'Select Company Instead',
					type: 'link',
					link: '../pick-a-company'
				}];
			}
		});
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

}

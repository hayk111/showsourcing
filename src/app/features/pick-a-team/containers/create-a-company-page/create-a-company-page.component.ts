import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, mergeMap } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '~common/auth-pages/components';
import { CompanyService, TeamService, UserService } from '~entity-services';
import { Company, Team } from '~models';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { translate } from '~utils';

@Component({
	selector: 'create-a-company-page-app',
	templateUrl: './create-a-company-page.component.html',
	styleUrls: ['./create-a-company-page.component.scss', '../../../../common/auth-pages/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateACompanyPageComponent extends AutoUnsub implements OnInit {

	hideForm = false;
	pending = false;
	error: string;
	returnUrl: string;

	listForm: AuthFormElement[];
	@Input() buttons: AuthFormButton[];
	@Input() hasSpinner: boolean;

	constructor(
		private fb: FormBuilder,
		private srv: CompanyService,
		private teamService: TeamService,
		private router: Router,
		private userSrv: UserService,
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef
	) {
		super();
		this.listForm = [{
			label: translate('Company name'),
			type: 'text',
			name: 'companyName',
			isRequired: true,
			placeHolder: '',
			validators: [Validators.required]
		}, {
			label: translate('Team name'),
			type: 'text',
			name: 'teamName',
			isRequired: true,
			placeHolder: '',
			validators: [Validators.required]
		}];
		this.buttons = [{
			label: translate('Create a new team'),
			type: 'button'
		}];
	}

	ngOnInit() {
		this.srv.selectAll().pipe(
			first()
		).subscribe(all => {
			if (all.length > 0) {
				this.buttons = [...this.buttons,
					// 	{
					// 	label: 'Select Company Instead',
					// 	type: 'link',
					// 	link: '../pick-a-company'
					// }
				];
			}
		});
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

	onSubmit(form: FormGroup) {
		this.pending = true;
		this.hideForm = true;
		const formValue = form.value;
		const company = new Company({ name: formValue.companyName });
		this.srv.create(company)
			.pipe(
				first(),
				mergeMap((_company: Company) => {
					const team = new Team({
						name: formValue.teamName,
						company: _company,
						ownerUser: { id: this.userSrv.userId, __typename: 'User' }
					});
					return this.teamService.create(team);
				})
			)
			.subscribe(
				_ => {
					this.pending = false;
					this.router.navigateByUrl(this.returnUrl);
					this.cdr.detectChanges();
				},
				e => {
					this.hideForm = false;
					this.pending = false;
					this.error = translate('We had an error creating your company. Please try again.');
					this.cdr.detectChanges();
				}
			);
	}

}

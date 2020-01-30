import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '../../../shared';
import { CompanyService, TeamService, UserService } from '~core/ORM/services';
import { Team } from '~core/ORM/models';
import { Company } from '~core/ORM/models/company.model';
import { AutoUnsub } from '~utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'create-a-team-page-app',
	templateUrl: './create-a-team-page.component.html',
	styleUrls: ['./create-a-team-page.component.scss', '../../../shared/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateATeamPageComponent extends AutoUnsub implements OnInit {

	@Input() buttons: AuthFormButton[];

	hideForm = false;
	pending = false;
	error: string;
	hasTeam$: Observable<boolean>;
	returnUrl: string;

	listForm: AuthFormElement[];

	constructor(
		private fb: FormBuilder,
		private srv: TeamService,
		private companySrv: CompanyService,
		private router: Router,
		private userSrv: UserService,
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef,
		private translate: TranslateService
	) {
		super();
		this.listForm = [{
			label: this.translate.instant('text.team-name'),
			type: 'text',
			name: 'name',
			isRequired: true,
			placeHolder: '',
			validators: [Validators.required]
		}];
		this.buttons = [{
			label: this.translate.instant('text.create-new-team'),
			type: 'button'
		}];
	}

	ngOnInit() {
		this.srv.selectAll().pipe(
			first()
		).subscribe(all => {
			if (all.length > 0) {
				this.buttons = [...this.buttons, {
					label: this.translate.instant('text.select-a-team-instead'),
					type: 'link',
					link: '../pick-a-team'
				}];
				this.cdr.detectChanges();
			}
		});
		this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
	}

	onSubmit(form: FormGroup) {
		this.pending = true;
		this.hideForm = true;
		const formValue = form.value;
		const company: Company = { id: this.companySrv.companySync.id };
		const team = new Team({ name: formValue.name, company, ownerUser: { id: this.userSrv.userSync.id } });
		this.srv.create(team)
			.subscribe(
				_ => {
					this.pending = false;
					this.router.navigateByUrl(this.returnUrl);
					this.cdr.detectChanges();
				},
				e => {
					this.hideForm = false;
					this.pending = false;
					this.error = this.translate.instant('error.create-team');
					this.cdr.detectChanges();
				}
			);
	}


}

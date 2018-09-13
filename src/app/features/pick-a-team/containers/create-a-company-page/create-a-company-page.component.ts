import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService, UserService } from '~global-services';
import { map, first } from 'rxjs/operators';
import { Company } from '~models/company.model';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
	selector: 'create-a-company-page-app',
	templateUrl: './create-a-company-page.component.html',
	styleUrls: ['./create-a-company-page.component.scss', '../../../auth/components/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateACompanyPageComponent implements OnInit {
	form: FormGroup;
	pending = false;
	error: string;
	hasCompany$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private srv: CompanyService,
		private router: Router,
		private userSrv: UserService
	) {
		this.form = this.fb.group({
			name: ['', Validators.required],
		});
	}

	onSubmit() {
		this.pending = true;
		const formValue = this.form.value;
		const company = new Company(formValue);
		this.srv.create(company)
			.subscribe(
				_ => {
					this.pending = false;
					this.router.navigate(['']);
				},
				e => {
					this.pending = false;
					this.error = 'We had an error creating your company. Please try again.';
				}
			);
	}

	ngOnInit() {

		this.hasCompany$ = this.srv.selectAll().pipe(
			first(),
			map(all => all.length > 0)
		);

	}

}

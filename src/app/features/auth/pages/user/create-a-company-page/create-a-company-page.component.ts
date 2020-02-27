import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CompanyService } from '~core/auth';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'create-a-company-page-app',
	templateUrl: './create-a-company-page.component.html',
	styleUrls: ['./create-a-company-page.component.scss', '../../../shared/form-style.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateACompanyPageComponent extends AutoUnsub implements OnInit {
	form = this.fb.group({
		name: ['', Validators.required]
	});
	pending$ = new BehaviorSubject(false);
	error: string;

	constructor(
		private fb: FormBuilder,
		private companySrv: CompanyService,
		private router: Router
	) {
		super();
	}

	ngOnInit() {
	}

	onSubmit(form: FormGroup) {
		if (this.form.valid) {
			this.pending$.next(true);
			this.companySrv.create(this.form.value)
				.subscribe(_ => {
					this.pending$.next(false);
					this.router.navigate(['auth', 'user', 'create-a-team']);
				});
		}
	}

}

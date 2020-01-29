import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'forgot-password-submit-page-app',
	templateUrl: './forgot-password-submit-page.component.html',
	styleUrls: ['./forgot-password-submit-page.component.scss', '../../shared/form-style.scss']
})
export class ForgotPasswordSubmitPageComponent extends AutoUnsub implements OnInit {

	pending$ = new BehaviorSubject(false);
	form = this.fb.group({
		code: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
		password: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]]
	});
	username: string;
	error: string;

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {
		super();
	}

	ngOnInit() {
		this.username = this.route.snapshot.queryParamMap.get('username');
	}

	onSubmit() {
		if (this.form.valid ) {
			const { code, password} = this.form.value;
			this.pending$.next(true);
			this.authSrv.forgotPasswordSubmit(this.username, code, password)
			.catch (e => this.error = e.code)
			.finally(() => this.pending$.next(false));
		}
	}
}

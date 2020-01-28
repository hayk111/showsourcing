import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';

@Component({
	selector: 'forgot-password-page-app',
	templateUrl: './forgot-password-page.component.html',
	styleUrls: ['./forgot-password-page.component.scss', '../../shared/form-style.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

	pending$ = new BehaviorSubject(false);
	form = this.fb.group({
		username: ['', [ Validators.required, Validators.email ]]
	});
	error: string;

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {	}

	ngOnInit() {
		const username = this.route.snapshot.queryParamMap.get('username');
		if (username) {
			this.form.setValue({ username });
		}
	}

	onSubmit() {
		if (this.form.valid) {
			this.pending$.next(true);
			this.authSrv.forgotPassword(this.form.value.username)
			.catch(e => this.error = e.code)
			.finally(() => this.pending$.next(false));
		}
	}
}

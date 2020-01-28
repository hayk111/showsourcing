import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'sign-in-page-app',
	templateUrl: './sign-in-page.component.html',
	styleUrls: ['./sign-in-page.component.scss', '../../shared/form-style.scss']
})
export class SignInPageComponent implements OnInit {
	pending$ = new BehaviorSubject(false);
	error: string;
	queryParams: any;
	username: string;
	form: FormGroup = this.fb.group({
		// the email is used as username
		username: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required]
	});

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		const username = this.route.snapshot.queryParamMap.get('username');
		if (username) {
			this.username = username;
			this.form.setValue({ username: this.username, password: '' });
		}
	}

	signIn() {
		if (this.form.valid) {
			this.pending$.next(true);
			this.authSrv.signIn(this.form.value)
			.catch(e => this.error = e.code)
			.finally(() => this.pending$.next(false));
		}
	}

	goToSignUp() {
		this.authSrv.goToSignUp();
	}

	goToForgotPassword() {
		this.authSrv.goToForgotPassword(this.form.value.username);
	}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '~core/auth/services/authentication.service';

@Component({
	selector: 'sign-up-page-app',
	templateUrl: './sign-up-page.component.html',
	styleUrls: ['./sign-up-page.component.scss', '../../shared/form-style.scss']
})
export class SignUpPageComponent implements OnInit {
	pending$ = new BehaviorSubject(false);
	error: string;
	form: FormGroup = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		// the email is used as username
		username: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]]
	}, { updateOn : 'change' });

	constructor(
		private authSrv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) { }

	ngOnInit() {
	}

	createAccount() {
		if (this.form.valid) {
			this.pending$.next(true);
			// async await doesn't work as expected on angular on version 8
			// https://github.com/angular/angular/issues/31730
			this.authSrv.signUp(this.form.value)
			.catch(e => this.error = e.code)
			.finally(() => this.pending$.next(false));
		}
	}

	goToSignIn() {
		this.authSrv.goToSignIn();
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}


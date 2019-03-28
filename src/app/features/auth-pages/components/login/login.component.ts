import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '~common/auth-pages/components';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss', '../../../../common/auth-pages/components/form-style.scss'],
})
export class LoginComponent extends AutoUnsub implements OnInit {
	pending$ = new Subject<boolean>();
	error: string;
	queryParams: any;
	filedFocused = 'email';

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(
		private srv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute) {

		super();
	}

	ngOnInit() {
		// get return url from route parameters or default to '/'
		this.queryParams = this.route.snapshot.queryParams || '/';
		this.listForm = [{
			label: 'Email',
			type: 'email',
			name: 'login',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: 'example@showsourcing.com',
			validators: [Validators.required, Validators.email]
		}, {
			label: 'Password',
			type: 'password',
			name: 'password',
			isRequired: true,
			autoComplete: 'current-password',
			placeHolder: 'your password',
			validators: [Validators.required]
		}];

		this.buttons = [{
			label: 'Login',
			type: 'button'
		}, {
			label: 'Don\'t have an account ?',
			type: 'link',
			link: ['../register'],
			queryParams: this.queryParams
		}];
	}

	onSubmit(form: FormGroup) {
		if (form.valid) {
			this.pending$.next(true);
			this.srv.login(form.value).pipe(
				takeUntil(this._destroy$)
			).subscribe(
				r => this.onSuccess(r),
				e => this.onError(e)
			);
		}
	}

	onSuccess(r: any) {
		debugger;
		this.router.navigateByUrl(this.queryParams.returnUrl);
	}

	onError(error: any) {
		if (error.status === 401)
			this.error = 'Incorrect credentials';
		else if (error.status === 403)
			this.error = 'Email not validated, please check your inbox';
		else
			this.error = 'Submition failed, please try again in a short while';

		this.pending$.next(false);
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}

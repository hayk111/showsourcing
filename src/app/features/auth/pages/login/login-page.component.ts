import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { AuthFormButton, AuthFormElement } from '../../shared';

@Component({
	selector: 'login-page-app',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss', '../../shared/form-style.scss']
})
export class LoginPageComponent extends AutoUnsub implements OnInit {
	pending$ = new Subject<boolean>();
	error: string;
	queryParams: any;
	filedFocused = 'email';

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(
		private srv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		// get return url from route parameters or default to '/'
		this.queryParams = this.route.snapshot.queryParams || '/';
		const email = this.queryParams.email;
		this.listForm = [{
			label: this.translate.instant('label.email'),
			value: email,
			type: 'email',
			name: 'login',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: 'example@showsourcing.com',
			validators: [Validators.required, Validators.email]
		}, {
			label: this.translate.instant('label.password'),
			type: 'password',
			name: 'password',
			isRequired: true,
			autoComplete: 'current-password',
			placeHolder: this.translate.instant('placeholder.your-password'),
			validators: [Validators.required]
		}];

		this.buttons = [{
			label: this.translate.instant('button.login'),
			type: 'button'
		}, {
			label: this.translate.instant('button.do-not-have-an-account'),
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
		this.router.navigateByUrl(this.queryParams.returnUrl);
	}

	onError(error: any) {
		if (error.status === 401)
			this.error = this.translate.instant('error.incorrect-credentials');
		else if (error.status === 403)
			this.error = this.translate.instant('error.email-not-validated-please-check-your-inbox');
		else
			this.error = this.translate.instant('error.submition-failed-please-try-again');

		this.pending$.next(false);
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}

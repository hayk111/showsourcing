import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '../../shared';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'register-page-app',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss', '../../shared/form-style.scss']
})
export class RegisterPageComponent extends AutoUnsub implements OnInit {

	pending$ = new Subject<boolean>();
	error: string;
	queryParams: any;
	filedFocused = 'firstName';

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(
		private authSrv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService
		) {
		super();
	}

	ngOnInit() {
		this.queryParams = this.route.snapshot.queryParams || '/';
		const email = this.queryParams.email;

		this.listForm = [{
			label: this.translate.instant('label.first-name'),
			type: 'text',
			name: 'firstName',
			isRequired: true,
			autoComplete: 'given-name',
			placeHolder: this.translate.instant('placeholder.your-first-name'),
			validators: [Validators.required]
		}, {
			label: this.translate.instant('label.last-name'),
			type: 'text',
			name: 'lastName',
			isRequired: true,
			autoComplete: 'family-name',
			placeHolder: this.translate.instant('placeholder.your-last-name'),
			validators: [Validators.required]
		}, {
			label: this.translate.instant('label.email'),
			value: email,
			type: 'email',
			name: 'email',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: 'example@showsourcing.com',
			validators: [Validators.required, Validators.email],
			hint: this.translate.instant('hint.company-tip'),
			error: {
				type: null,
				msg: this.translate.instant('error.pick-another-email')
			}
		}, {
			label: this.translate.instant('label.password'),
			type: 'password',
			name: 'password',
			isRequired: true,
			autoComplete: 'current-password',
			placeHolder: this.translate.instant('placeholder.your-password'),
			validators: [Validators.required],
			error: {
				type: 'minlength',
				msg: this.translate.instant('error.min-characters-required')
			}
		}];
		this.buttons = [{
			label: this.translate.instant('button.sign-up'),
			type: 'button'
		}, {
			label: this.translate.instant('button.account-already-existed'),
			type: 'link',
			link: ['../login'],
			queryParams: this.queryParams
		}];
	}

	createAccount(form: FormGroup) {
		if (form.valid) {
			this.pending$.next(true);
			this.authSrv.register(form.value).pipe(
				takeUntil(this._destroy$),
				take(1),
			).subscribe(
				r => this.router.navigateByUrl(this.queryParams.returnUrl),
				e => this.onError(e, form)
			);
		}
	}

	onError(error: any, form: FormGroup) {
		this.pending$.next(false);
		if (error.error && error.error.errors && error.error.errors.email) {
			form.get('email').markAsPristine();
			this.error = this.translate.instant('error.account-already-existed-with-email');
		} else {
			this.error = error.error.message;
		}
	}

	forgotPw() {
		this.router.navigate(['../forgot-password'], { relativeTo: this.route });
	}
}


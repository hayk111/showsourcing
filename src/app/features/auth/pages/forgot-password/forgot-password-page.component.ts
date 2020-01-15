import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '../../shared';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'forgot-password-page-app',
	templateUrl: './forgot-password-page.component.html',
	styleUrls: ['./forgot-password-page.component.scss', '../../shared/form-style.scss']
})
export class ForgotPasswordPageComponent extends AutoUnsub implements OnInit {

	pending: boolean;
	error: string;
	queryParams: any;

	filedFocused = 'email';

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private authSrv: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		this.queryParams = this.route.snapshot.queryParams || '/';

		this.listForm = [{
			label: this.translate.instant('text.email'),
			type: 'email',
			name: 'email',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: this.translate.instant('placeholder.your-email'),
			validators: [Validators.required, Validators.email]
		}];
		this.buttons = [{
			label: this.translate.instant('button.send'),
			type: 'button'
		}, {
			label: this.translate.instant('button.login'),
			type: 'link',
			link: ['../login'],
			queryParams: this.queryParams
		}];
	}

	onSubmit(form) {
		if (form.valid) {
			this.pending = true;
			this.authSrv.resetPassword(form.value).pipe(
				catchError(error => {
					// lmao, I didn't do what's under this (Van Huy did) :DDD
					if (error.error && error.error.errors && error.error.errors.length > 0) {
						this.error = error.error.errors[0];
					} else {
						this.error = this.translate.instant('error.when-requesting-password-reset');
					}
					return throwError(error);
				})
			).subscribe(r => {
				this.pending = false;
				this.cdr.detectChanges();
				this.router.navigate(['auth', 'password-resetted']);
			}, err => {
				this.pending = false;
				this.cdr.detectChanges();
			});
		}
	}
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthFormButton, AuthFormElement } from '~common/auth-pages/components';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss', '../../../../common/auth-pages/components/form-style.scss']
})
export class ForgotPasswordComponent extends AutoUnsub implements OnInit {

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
	) {
		super();
	}

	ngOnInit() {
		this.queryParams = this.route.snapshot.queryParams || '/';

		this.listForm = [{
			label: 'Email',
			type: 'email',
			name: 'email',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: 'Your email',
			validators: [Validators.required, Validators.email]
		}];
		this.buttons = [{
			label: 'Send',
			type: 'button'
		}, {
			label: 'Login',
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
					if (error.error && error.error.errors && error.error.errors.length > 0) {
						this.error = error.error.errors[0];
					} else {
						this.error = 'Error when requesting password reset';
					}
					return throwError(error);
				})
			).subscribe(r => {
				this.pending = false;
				this.cdr.detectChanges();
				this.router.navigate(['auth', 'login']);
			}, err => {
				this.pending = false;
				this.cdr.detectChanges();
			});
		}
	}
}

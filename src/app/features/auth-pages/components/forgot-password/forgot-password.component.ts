import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { takeUntil, take, catchError } from 'rxjs/operators';
import { AuthFormElement, AuthFormButton } from '~features/auth-pages/components/auth-form-base/auth-form';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss', '../form-style.scss']
})
export class ForgotPasswordComponent extends AutoUnsub implements OnInit {
	pending: boolean;
	error: string;

	filedFocused = 'email';

	listForm: AuthFormElement[];
	buttons: AuthFormButton[];

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
		private authSrv: AuthenticationService, private router: Router) {

		super();
	}

	ngOnInit() {
		this.listForm   = [{
			label: 'Email',
			type: 'email',
			name: 'email',
			isRequired: true,
			autoComplete: 'current-email',
			placeHolder: 'Your email',
			validators: [Validators.required, Validators.email]
		}];
		this.buttons = [{
			label: 'Login',
			type: 'button'
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
				this.router.navigate(['auth', 'login']);
			}, err => {
				this.pending = false;
				this.cdr.detectChanges();
			});
		}
	}
}

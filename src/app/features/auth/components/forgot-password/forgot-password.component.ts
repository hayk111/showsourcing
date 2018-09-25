import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { takeUntil, take, catchError } from 'rxjs/operators';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss', '../form-style.scss']
})
export class ForgotPasswordComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	pending: boolean;
	error: string;

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
		private authSrv: AuthenticationService, private router: Router) {

		super();
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.form.valid) {
			this.pending = true;
			this.authSrv.resetPassword(this.form.value).pipe(
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
				this.router.navigate([ 'guest', 'login' ]);
			}, err => {
				this.pending = false;
				this.cdr.detectChanges();
			});
		}
	}
}

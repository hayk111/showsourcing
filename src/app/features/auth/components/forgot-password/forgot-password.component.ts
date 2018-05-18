import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { AutoUnsub } from '~app/app-root/utils/auto-unsub.component';
import { AuthenticationService } from '~app/features/auth/services/authentication.service';
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

	constructor(private fb: FormBuilder, private authSrv: AuthenticationService) {
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
			this.authSrv.login(this.form.value).pipe(
				takeUntil(this._destroy$),
				take(1),
				catchError(error => this.error = error)
			).subscribe(r => this.pending = false);
		}
	}
}

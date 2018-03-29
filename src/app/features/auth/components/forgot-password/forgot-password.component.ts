import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '~app/features/auth/store/authentication.action';
import { Observable } from 'rxjs/Observable';
import { selectResetPwPagePending, selectResetPwPageError } from '~app/features/auth/store';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss', '../form-style.scss']
})
export class ForgotPasswordComponent implements OnInit {
	form: FormGroup;
	pending$: Observable<boolean>;
	error$: Observable<string>;

	constructor(private fb: FormBuilder, private store: Store<any>) {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

	ngOnInit() {
		this.pending$ = this.store.select(selectResetPwPagePending);
		this.error$ = this.store.select(selectResetPwPageError);
	}

	onSubmit() {
		if (this.form.valid)
			this.store.dispatch(AuthActions.resetPassword(this.form.value));
	}
}

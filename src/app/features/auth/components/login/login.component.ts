import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthActions, selectLoginPagePending, selectLoginPageError } from '~app/features/auth/store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	pending$: Observable<boolean>;
	error$: Observable<string>;

	constructor(private store: Store<any>, private fb: FormBuilder, private router: Router) {
		this.form = this.fb.group({
			identifier: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.pending$ = this.store.select(selectLoginPagePending);
		this.error$ = this.store.select(selectLoginPageError);
	}

	onSubmit() {
		if (this.form.valid)
			this.store.dispatch(AuthActions.login(this.form.value));
	}

	forgotPw() {
		this.router.navigate(['forgot-password']);
	}
}

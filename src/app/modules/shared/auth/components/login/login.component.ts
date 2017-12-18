import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../../utils/credentials.interface';
import { Authentication } from '../../../../store/model/authentication.model';
import { selectAuthentication } from '../../../../store/selectors/authentication.selector';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthActions } from '../../../../store/action/authentication.action';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	creds: FormGroup;
	pending$: Observable<boolean>;
	error$: Observable<string>;
	@Output() forgotPassword = new EventEmitter<any>();

	constructor(private store: Store<any>, private fb: FormBuilder) {
		this.creds = this.fb.group({
			identifier: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
		const auth$ = this.store.select(selectAuthentication);
		this.pending$ = auth$.map((auth: Authentication) => auth.pending);
		this.error$ = auth$.map((auth: Authentication) => auth.errorMsg);
	}

	onSubmit() {
		if (this.creds.valid)
			this.store.dispatch(AuthActions.login(this.creds.value));
	}

	forgotPw() {
		this.forgotPassword.emit(null);
	}
}

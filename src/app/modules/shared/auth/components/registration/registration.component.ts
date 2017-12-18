import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Authentication } from '../../../../store/model/authentication.model';
import { selectAuthentication } from '../../../../store/selectors/authentication.selector';
import { AuthActions } from '../../../../store/action/authentication.action';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	form: FormGroup;
	pending$: Observable<boolean>;
	error$: Observable<string>;

	constructor(private store: Store<any>, private fb: FormBuilder) { }

	ngOnInit() {
		this.makeForm();
		const auth$ = this.store.select(selectAuthentication);
		this.pending$ = auth$.map((auth: Authentication) => auth.pending);
		this.error$ = auth$.map((auth: Authentication) => auth.errorMsg);
	}

	makeForm() {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	createAccount() {
		this.store.dispatch(AuthActions.register(this.form.value));
	}

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '~app/features/auth/store';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss', '../form-style.scss']
})
export class RegistrationComponent implements OnInit {
	form: FormGroup;
	pending$: Observable<boolean>;
	error$: Observable<string>;

	constructor(private store: Store<any>, private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
		});
		this.pending$ = this.store.select(fromAuth.selectRegisterPagePending);
		this.error$ = this.store.select(fromAuth.selectRegisterPageError);
	}

	createAccount() {
		if (this.form.valid)
			this.store.dispatch(fromAuth.AuthActions.register(this.form.value));
	}

}

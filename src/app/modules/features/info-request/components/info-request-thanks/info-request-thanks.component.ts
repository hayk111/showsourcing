import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/action/misc/authentication.action';

@Component({
	selector: 'app-info-request-thanks',
	templateUrl: './info-request-thanks.component.html',
	styleUrls: ['./info-request-thanks.component.scss']
})
export class InfoRequestThanksComponent implements OnInit {
	form: FormGroup;

	constructor(private fb: FormBuilder, private store: Store<any>) { }

	ngOnInit() {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.email, Validators.required])],
			password: ['', Validators.required ]
		});
	}

	createAccount() {
		this.store.dispatch(AuthActions.register(this.form.value));
	}

}

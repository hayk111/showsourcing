import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Authentication } from '../../../../store/model/misc/authentication.model';
import { selectAuthentication } from '../../../../store/selectors/misc/authentication.selector';
import { AuthActions } from '../../../../store/action/misc/authentication.action';

@Component({
	selector: 'registration-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	form: FormGroup;
	@Input() pending: boolean;
	@Input() error: any;
	@Output() register = new EventEmitter<any>();

	constructor(private store: Store<any>, private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	createAccount() {
		if (this.form.valid)
			this.register.emit(this.form.value);
	}

}

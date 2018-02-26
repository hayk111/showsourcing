import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../../utils/credentials.interface';
import { Authentication } from '~store/model/misc/authentication.model';
import { selectAuthentication } from '~store/selectors/misc/authentication.selector';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthActions } from '~store/action/misc/authentication.action';

@Component({
	selector: 'login-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	creds: FormGroup;
	@Output() forgotPassword = new EventEmitter<any>();
	@Output() login = new EventEmitter<any>();
	@Input() pending: boolean;
	@Input() error: any;

	constructor(private store: Store<any>, private fb: FormBuilder) {
		this.creds = this.fb.group({
			identifier: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.creds.valid)
			this.login.emit(this.creds.value);
	}

	forgotPw() {
		this.forgotPassword.emit();
	}
}

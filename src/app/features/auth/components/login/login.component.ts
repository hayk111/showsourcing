import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

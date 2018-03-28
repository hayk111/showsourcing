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
	form: FormGroup;
	@Output() forgotPassword = new EventEmitter<any>();
	@Output() login = new EventEmitter<any>();
	@Input() pending: boolean;
	@Input() error: any;

	constructor(private store: Store<any>, private fb: FormBuilder) {
		this.form = this.fb.group({
			identifier: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.form.valid)
			this.login.emit(this.form.value);
	}

	forgotPw() {
		this.forgotPassword.emit();
	}
}

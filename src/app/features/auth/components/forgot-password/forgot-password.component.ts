import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	@Output() back = new EventEmitter<any>();
	@Output() resetPw = new EventEmitter<string>();
	@Input() pending: boolean;
	@Input() error: any;
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

	ngOnInit() {
	}

	goBack() {
		this.back.emit();
	}

	onSubmit() {
		if (this.form.valid)
			this.resetPw.emit(this.form.controls.email.value);
	}
}

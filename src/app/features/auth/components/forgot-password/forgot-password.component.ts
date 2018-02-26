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
	group: FormGroup;

	constructor(private fb: FormBuilder) {
		this.group = this.fb.group({
			email: ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	goBack() {
		this.back.emit();
	}

	onSubmit() {
		if (this.group.valid)
			this.resetPw.emit(this.group.controls.email.value);
	}
}

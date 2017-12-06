import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

	group: FormGroup;

	constructor(private fb: FormBuilder) {
		this.group = this.fb.group({
			email: ['', Validators.required]
		});
	}

	ngOnInit() {
	}


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-info-request-thanks',
	templateUrl: './info-request-thanks.component.html',
	styleUrls: ['./info-request-thanks.component.scss']
})
export class InfoRequestThanksComponent implements OnInit {
	form: FormGroup;

	constructor(private auth: AuthService, private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.email, Validators.required])],
			password: ['', Validators.required ]
		});
	}

	createAccount() {
		this.auth.register(this.form.value);
	}

}

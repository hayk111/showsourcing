import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'forgot-password-app',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

	email = '';

	constructor() { }

	ngOnInit() {
	}


}

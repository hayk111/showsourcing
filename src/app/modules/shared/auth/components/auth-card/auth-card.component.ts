import { Component, OnInit } from '@angular/core';
import { AuthCardService } from '../../services/auth-card.service';

@Component({
	selector: 'auth-card-app',
	templateUrl: './auth-card.component.html',
	styleUrls: ['./auth-card.component.scss']
})
export class AuthCardComponent implements OnInit {
	view = 'login';

	constructor() { }

	ngOnInit() {
	}

	onAction() {

	}
	forgotPassword() {
		this.view = 'forgotPassword';
	}

}

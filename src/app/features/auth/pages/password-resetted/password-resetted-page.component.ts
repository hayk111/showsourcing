import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'password-resetted-page-app',
	templateUrl: './password-resetted-page.component.html',
	styleUrls: ['./password-resetted-page.component.scss']
})
export class PasswordResettedPageComponent {

	constructor(private router: Router) { }

	goLogin() {
		this.router.navigate(['auth', 'login']);
	}

}

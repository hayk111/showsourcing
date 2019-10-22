import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'pw-resetted-page-app',
	templateUrl: './pw-resetted-page.component.html',
	styleUrls: ['./pw-resetted-page.component.scss']
})
export class PasswordResettedPageComponent {

	constructor(private router: Router) { }

	goLogin() {
		this.router.navigate(['auth', 'login']);
	}

}

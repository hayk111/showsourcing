import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'pw-resetted-app',
	templateUrl: './pw-resetted.component.html',
	styleUrls: ['./pw-resetted.component.scss']
})
export class PwResettedComponent {

	constructor(private router: Router) { }

	goLogin() {
		this.router.navigate(['auth', 'login']);
	}

}

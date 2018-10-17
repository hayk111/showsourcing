import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'proof-of-identity-app',
	templateUrl: './proof-of-identity.component.html',
	styleUrls: ['./proof-of-identity.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QRCodeComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['supplier', 'proof-of-identity']);
	}

	nextPage() {
		this.router.navigate(['supplier', 'verification']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}

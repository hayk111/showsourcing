import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'qrcode-app',
	templateUrl: './qrcode.component.html',
	styleUrls: ['./qrcode.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QRCodeComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['proof-of-identity']);
	}

	nextPage() {
		this.router.navigate(['verification']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}

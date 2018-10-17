import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'verification-app',
	templateUrl: './verification.component.html',
	styleUrls: ['./verification.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['supplier', 'qrcode']);
	}

	nextPage() {
		this.router.navigate(['supplier', 'congratulations']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}

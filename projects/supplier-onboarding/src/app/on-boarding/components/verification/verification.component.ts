import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'verification-app',
	templateUrl: './verification.component.html',
	styleUrls: ['./verification.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationComponent implements OnInit {

	form: FormGroup;

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['qrcode']);
	}

	nextPage() {
		this.router.navigate(['congratulations']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}

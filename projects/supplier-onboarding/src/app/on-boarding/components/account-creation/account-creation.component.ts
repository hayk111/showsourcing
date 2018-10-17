import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'account-creation-app',
	templateUrl: './account-creation.component.html',
	styleUrls: ['./account-creation.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCreationComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['contact-details']);
	}

	nextPage() {
		this.router.navigate(['proof-of-identity']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}

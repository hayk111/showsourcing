import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'business-description-app',
	templateUrl: './business-description.component.html',
	styleUrls: ['./business-description.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessDescriptionComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['supplier', 'category']);
	}

	nextPage() {
		this.router.navigate(['supplier', 'contact-details']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}

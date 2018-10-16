import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'contact-details-app',
	templateUrl: './contact-details.component.html',
	styleUrls: ['./contact-details.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

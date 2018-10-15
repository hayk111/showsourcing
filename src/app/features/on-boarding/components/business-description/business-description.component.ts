import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'business-description-app',
	templateUrl: './business-description.component.html',
	styleUrls: ['./business-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessDescriptionComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

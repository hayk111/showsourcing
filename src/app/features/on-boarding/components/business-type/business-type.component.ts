import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'business-type-app',
	templateUrl: './business-type.component.html',
	styleUrls: ['./business-type.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessTypeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

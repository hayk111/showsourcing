import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'request-details-app',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

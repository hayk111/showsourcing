import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'find-business-app',
	templateUrl: './find-business.component.html',
	styleUrls: ['./find-business.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindBusinessComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

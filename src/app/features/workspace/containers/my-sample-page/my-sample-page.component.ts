import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'my-sample-page-app',
	templateUrl: './my-sample-page.component.html',
	styleUrls: ['./my-sample-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySamplePageComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

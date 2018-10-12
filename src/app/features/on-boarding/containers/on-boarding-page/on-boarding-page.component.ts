import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'on-boarding-page-app',
	templateUrl: './on-boarding-page.component.html',
	styleUrls: ['./on-boarding-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnBoardingPageComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

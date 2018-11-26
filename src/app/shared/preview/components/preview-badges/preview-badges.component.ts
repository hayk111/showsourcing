import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'review-badges-app',
	templateUrl: './preview-badges.component.html',
	styleUrls: ['./preview-badges.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBadgesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

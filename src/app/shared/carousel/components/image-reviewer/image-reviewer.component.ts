import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'image-reviewer-app',
	templateUrl: './image-reviewer.component.html',
	styleUrls: ['./image-reviewer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageReviewerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

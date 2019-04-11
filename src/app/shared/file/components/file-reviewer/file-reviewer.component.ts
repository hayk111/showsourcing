import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'file-reviewer-app',
	templateUrl: './file-reviewer.component.html',
	styleUrls: ['./file-reviewer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileReviewerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

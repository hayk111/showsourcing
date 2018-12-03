import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'sample-board-view-app',
	templateUrl: './sample-board-view.component.html',
	styleUrls: ['./sample-board-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleBoardViewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

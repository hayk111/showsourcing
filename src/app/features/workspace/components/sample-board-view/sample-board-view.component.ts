import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { Sample } from '~core/models';

@Component({
	selector: 'sample-board-view-app',
	templateUrl: './sample-board-view.component.html',
	styleUrls: ['./sample-board-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleBoardViewComponent extends ListViewComponent<Sample> implements OnInit {

	constructor() { super(); }

	ngOnInit() {
	}

}

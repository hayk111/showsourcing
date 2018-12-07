import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { Sample } from '~core/models';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';

@Component({
	selector: 'sample-board-view-app',
	templateUrl: './sample-board-view.component.html',
	styleUrls: ['./sample-board-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleBoardViewComponent extends ListViewComponent<Sample> implements OnInit {

	@Input() columns: KanbanColumn[];
	@Output() updateStatusSample = new EventEmitter<KanbanDropEvent>();
	@Output() updateStatusSamples = new EventEmitter<{ to: any, items: any[] }>();

	constructor() { super(); }

	ngOnInit() {
	}


	onColumnSelected(samples: Sample[]) {
		samples.forEach(sample => this.select.emit(sample));
	}

	onColumnUnselected(samples: Sample[]) {
		samples.forEach(sample => this.unselect.emit(sample));
	}
}

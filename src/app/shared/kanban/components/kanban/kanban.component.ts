import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~utils/tracking-component';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';

export interface SelectionChangeEvent {
	selectableItems: any[];
	selection: Map<string, any>;
}

@Component({
	selector: 'kanban-app',
	templateUrl: './kanban.component.html',
	styleUrls: ['./kanban.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanComponent extends TrackingComponent {
	@Input() cols: KanbanColumn[] = [];
	/** template for the displayed item */
	@Input() cardTemplate: any;
	@Input() amountLoaded: number;
	@Input() set width(width: string) {
		this._width = width + 'px';
	}
	@Output() drop = new EventEmitter<KanbanDropEvent>();
	@Output() multipleDrop = new EventEmitter<KanbanDropEvent>();
	/** when the top checkbox is checked */
	@Output() selectionChange;
	@Output() loadMore = new EventEmitter<KanbanColumn>();



	_width = 'inherit';

	constructor(
		private kanbanSrv: KanbanService,
		public selectionSrv: KanbanSelectionService
	) {
		super();
	}

	get ids() {
		return this.cols.map(col => col.id);
	}

	onDrop(event: CdkDragDrop<any>) {
		const item = event.previousContainer.data[event.previousIndex];
		const selection = this.selectionSrv.selection;

		if (selection.size > 0 && selection.has(item.id)) {
			return this.onMultipleDrop(event);
		}
		const emitted = {
			item,
			from: this.cols.find(col => col.id === event.previousContainer.id),
			to: this.cols.find(col => col.id === event.container.id),
		};
		if (event.previousContainer === event.container) {
			this.kanbanSrv.moveItemInsideColumn(
				event.container.id,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			this.kanbanSrv.transferItem(
				event.previousContainer.id,
				event.container.id,
				event.previousIndex,
				event.currentIndex
			);
			this.drop.emit(emitted);
		}
	}

	onMultipleDrop(event: CdkDragDrop<any>) {
		const ids = Array.from(this.selectionSrv.selection.keys());
		this.kanbanSrv.transferMultiple(ids, event.container.id, event.currentIndex);
		this.multipleDrop.emit({
			from: this.cols.find(col => col.id === event.previousContainer.id),
			to: this.cols.find(col => col.id === event.container.id),
			items: ids
		});
	}

	getOtherIds(thatId) {
		return this.ids.filter(id => id !== thatId);
	}

	onSelectOne() {

	}

}

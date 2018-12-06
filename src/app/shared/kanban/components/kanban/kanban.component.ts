import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~utils/tracking-component';

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
	@Input() selection: Map<string, any>;
	@Input() set width(width: string) {
		this._width = width + 'px';
	}
	@Output() drop = new EventEmitter<KanbanDropEvent>();
	@Output() multipleDrop = new EventEmitter<{ to: any, items: any[] }>();
	/** when the top checkbox is checked */
	@Output() selectColumn = new EventEmitter<any[]>();
	@Output() unselectColumn = new EventEmitter<any[]>();


	_width = 'inherit';

	get ids() {
		return this.cols.map(col => col.id);
	}

	onDrop(event: CdkDragDrop<any>) {
		if (this.selection.size > 0) {
			return this.onMultipleDrop(event);
		}
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
		this.drop.emit({
			item: event.container.data[event.currentIndex],
			from: event.previousContainer.id,
			to: event.container.id
		});
	}

	onMultipleDrop(event) {
		const ids = Array.from(this.selection.keys());
		this.multipleDrop.emit({
			to: event.container.id,
			items: ids
		});
	}

	getOtherIds(thatId) {
		return this.ids.filter(id => id !== thatId);
	}

}

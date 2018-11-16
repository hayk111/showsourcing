import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanColumn, KanbanDropEvent } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

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
	@Output() drop = new EventEmitter<KanbanDropEvent>();
	/** when the top checkbox is checked */
	@Output() check = new EventEmitter<boolean>();

	get ids() {
		return this.cols.map(col => col.id);
	}

	onDrop(event: CdkDragDrop<any>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
		this.drop.emit({
			item: event.container.data[event.currentIndex],
			from: event.previousContainer.id,
			to: event.container.id
		});
	}

	getStyle(col: KanbanColumn) {
		return {
			'border-top-color': `var(--color-${col.color})`
		};
	}

	getOtherIds(thatId) {
		return this.ids.filter(id => id !== thatId);
	}
}

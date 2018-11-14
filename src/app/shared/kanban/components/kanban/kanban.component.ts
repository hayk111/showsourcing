import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, EventEmitter, Component, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { KanbanColum } from '~shared/kanban/interfaces/kanban-column.interface';

@Component({
	selector: 'kanban-app',
	templateUrl: './kanban.component.html',
	styleUrls: ['./kanban.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanComponent {
	@Input() cols: KanbanColum[] = [];
	/** template for the displayed item */
	@Input() cardTemplate: any;
	@Output() drop = new EventEmitter<CdkDragDrop<any>>();
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
		this.drop.emit(event);
	}

	getStyle(col: KanbanColum) {
		return {
			'border-top-color': `var(--color-${col.color})`
		};
	}

	getOtherIds(thatId) {
		return this.ids.filter(id => id !== thatId);
	}
}

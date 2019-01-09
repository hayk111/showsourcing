import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import {
	ChangeDetectionStrategy, Component, EventEmitter,
	Input, OnInit, Output, TemplateRef, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { KanbanColumn } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'kanban-col-app',
	templateUrl: './kanban-col.component.html',
	styleUrls: ['./kanban-col.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColComponent extends TrackingComponent implements OnInit {
	@Input() col: KanbanColumn;
	@Input() cardTemplate: TemplateRef<any>;
	@Input() connectedLists: string[];
	@Input() selection: Map<string, any>;
	@Output() selectAll = new EventEmitter<any[]>();
	@Output() unselectAll = new EventEmitter<any[]>();
	@Output() drop = new EventEmitter<CdkDragDrop<any>>();
	@Output() loadMore = new EventEmitter<KanbanColumn>();
	draggedId: string;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	getStyle(col: KanbanColumn) {
		return {
			'border-top-color': `var(--color-${col.color})`
		};
	}

	onDrop(event: CdkDragDrop<any>) {
		this.drop.emit(event);
	}

	hasAllSelected() {
		const hasData = this.col.data.length > 0;
		if (!hasData) {
			return false;
		}
		return this.col.data.every(item => this.selection.has(item.id));
	}

	/** we use the mouse enter event since it happens before the drag process starts */
	onMouseEnter(item: any) {
		this.draggedId = item.id;
	}

}

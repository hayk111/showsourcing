import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { KanbanColumn } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~utils/tracking-component';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';

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
	@Input() amountLoaded: number;
	@Output() selectAll = new EventEmitter<{ data: any[], column: any }>();
	@Output() unselectAll = new EventEmitter<{ data: any[], column: any }>();
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
			'background-color': `var(--color-${col.color})`
		};
	}

	onDrop(event: CdkDragDrop<any>) {
		this.drop.emit(event);
	}

	getCheckboxState() {
		const hasData = this.col.data.length > 0;
		if (!hasData) {
			return false;
		}
		return this.col.data.every(item => this.selection.has(item.id));
	}

	getSelectionState(): SelectionState {
		const rows = this.col.data;
		const selection = this.col.data.map(data => this.selection.has(data.id));
		if (!rows || rows.length === 0)
			return 'unchecked';

		if (selection.length === rows.length) {
			return 'selectedAll';
		} else if (selection.length === 0) {
			return 'unchecked';
		} else {
			return 'selectedPartial';
		}
	}

	/** we use the mouse enter event since it happens before the drag process starts */
	onMouseEnter(item: any) {
		this.draggedId = item.id;
	}

}

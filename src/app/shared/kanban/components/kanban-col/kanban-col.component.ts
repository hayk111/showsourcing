import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { KanbanColumn } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~utils/tracking-component';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
	@Input() selectionState: SelectionState;
	@Input() amountLoaded: number;
	@Output() selectAll = new EventEmitter<{ data: any[], column: any }>();
	@Output() unselectAll = new EventEmitter<{ data: any[], column: any }>();
	@Output() drop = new EventEmitter<CdkDragDrop<any>>();
	@Output() loadMore = new EventEmitter<KanbanColumn>();
	draggedId: string;

	constructor(public selectionSrv: KanbanSelectionService) {
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

	/** we use the mouse enter event since it happens before the drag process starts */
	onMouseEnter(item: any) {
		this.draggedId = item.id;
	}

	getColumnSelectionState$(col: KanbanColumn): Observable<SelectionState> {
		return this.selectionSrv.selectedColumn$.pipe(
			map(selectedColumn => selectedColumn.column.id === col.id ? selectedColumn.state : 'unchecked')
		);
	}

	selectCol() {
		this.selectionSrv.selectAllFromColumn(this.col);
	}

	unselectCol() {
		this.selectionSrv.unselectAllFromColumn();
	}

}

import {
	Component, OnInit, Output, Input, EventEmitter,
	TemplateRef, HostBinding, Renderer2, ElementRef
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Kanban2Service } from '~features/workflow2/services/kanban2.service';
import { KanbanColumn, KanbanItem } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { HeaderModule } from '~shared/header';

/** Drag'n drop workflow */

@Component({
	selector: 'workflow-kanban2-app',
	templateUrl: './workflow-kanban2.component.html',
	styleUrls: ['./workflow-kanban2.component.scss']
})
export class WorkflowKanban2Component extends TrackingComponent implements OnInit {
	/** The list of columns included associated items */
	@Input() columns: KanbanColumn[];
	/** A reference to the contextual menu template */
	@Input() contextualMenu: TemplateRef<any>;
	/** A reference to the contextual menu template */
	@Input() card: TemplateRef<any>;
	/** The selected items */
	@Input() selectedItems: any[];
	/** Whether a sidenav is displayed */
	@Input() withoutSidenav: boolean;
	/** Whether the kaban takes the full width */
	@Input() @HostBinding('class.full-width') fullWidth: boolean;
	/** The height of the offset regarding the header */
	@Input() kanbanVerticalPadding = 20;
	/** The height of the column offset regarding the header */
	@Input() kanbanHorizontalPadding = 20;
	/** The left offset. To be used in the case where there is a sidenav on the left */
	@Input() leftOffset = 0;
	/** The function to get the current column of an item */
	@Input() getCurrentColumnFct: Function;
	/** The dropped item event including data associated with the target and the element */
	@Output() itemDropped = new EventEmitter<{ target: any, droppedElement: any }>();
	/** Triggers when the item is selected */
	@Output() selectItem = new EventEmitter<any>();
	/** Triggers when the item is unselected */
	@Output() unselectItem = new EventEmitter<any>();
	/** Triggers when all items are selected for a column*/
	@Output() selectAllItems = new EventEmitter<any[]>();
	/** Triggers when all items are unselected for a column */
	@Output() unselectAllItems = new EventEmitter<any[]>();

	separatorColor: string;
	dragInProgress = false;
	dragDropEnable$ = new Subject<any>();



	constructor(private kanbanSrv: Kanban2Service, private renderer: Renderer2, private elementRef: ElementRef) {
		super();
	}

	ngOnInit() {
		if (this.leftOffset) {
			this.renderer.setStyle(this.elementRef.nativeElement, 'width', `calc(100vw - ${this.leftOffset}px)`);
		}
	}

	trackByFn(index, item) {
		return item.id;
	}

	/** The current column for an item */
	getCurrentColumn(item) {
		if (this.getCurrentColumnFct) {
			return this.getCurrentColumnFct(item);
		}
		return null;
	}

	/** The current column id for a item */
	getCurrentColumnTypeId(item) {
		const currentColumn = this.getCurrentColumn(item);
		if (currentColumn) {
			return currentColumn.id;
		}
		return null;
	}

	/** Detect when an item (through namespace) enters a dropzone */
	onItemEntered(namespace: string) {
		this.kanbanSrv.itemEntered$.next({ namespace });
	}

	/** Detect when an item (through namespace) leaves a dropzone */
	onItemLeft(namespace: string) {
		this.kanbanSrv.itemLeft$.next({ namespace });
	}

	/**
	 * Detect when an item is dropped and locally update ui (optimistic ui)
	 * before the request completes
	*/
	onItemDropped({ target, droppedElement }) {
		this.refreshColumnsInternally(target, droppedElement);
		this.itemDropped.next({ target, droppedElement });
	}

	/** Simulate the optimistic cache to directly update the UI */
	refreshColumnsInternally(target, droppedElement) {
		const newColumn = { id: target.id };
		const updatedItem = { ...droppedElement, column: newColumn };

		let currentColumnTypeId = this.getCurrentColumnTypeId(droppedElement);
		if (!currentColumnTypeId) {
			currentColumnTypeId = -1;
		}

		// Remove for old column
		const currentColumn = this.columns.find(column => column.id === currentColumnTypeId);
		if (currentColumn) {
			const items = currentColumn.items;
			const itemIndex = items.findIndex(p => p.id === droppedElement.id);
			if (itemIndex !== -1) {
				items.splice(itemIndex, 1);
				currentColumn.items = items.slice();
			}

		}

		// Add to new column
		const targetColumn = this.columns.find(column => column.id === target.id);
		if (targetColumn) {
			// const items = targetColumn.items;
			// const itemIndex = items.findIndex(p => p.id === droppedElement);
			targetColumn.items = targetColumn.items.concat([updatedItem]);
		}
	}

	onCheckItemsChange(column: any, checked: boolean) {
		console.log('>> onCheckItemsChange - column.items = ', column.items);
		if (checked) {
			this.selectAllItems.emit(column.items);
		} else {
			this.unselectAllItems.emit(column.items);
		}
	}

	isSelected(selectedItems, id) {
		return selectedItems.has(id);
	}

	hasAllItemsSelected(selectedItems, column) {
		if (!column || !column.items || column.items.length === 0) {
			return false;
		}

		let allSelected = true;
		column.items.forEach(item => {
			if (!this.isSelected(selectedItems, item.id)) {
				allSelected = false;
			}
		});
		return allSelected;
	}

	dragStart() {
		this.dragInProgress = true;
	}

	dragEnd() {
		this.dragInProgress = false;
	}
}

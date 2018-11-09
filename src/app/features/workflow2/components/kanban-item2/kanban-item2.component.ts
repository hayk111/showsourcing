import { Component, ElementRef, Injectable, Input, OnInit, ContentChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Kanban2Service } from '~features/workflow2/services/kanban2.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'kanban-item2-app',
	templateUrl: './kanban-item2.component.html',
	styleUrls: ['./kanban-item2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItem2Component extends AutoUnsub implements OnInit, AfterContentInit {
	/** The data associated with the item */
	@Input() data;
	/** The index associated with the item */
	@Input() index;
	/** The namespace associated with the item */
	@Input() namespace;
	@Input() dragDropEnable$: Subject<any>;
	/** The selected items */
	@Input() selectedItems: Map<string, any>;
	/** The drag'n drop started */
	@Output() dragStart = new EventEmitter<any>();
	/** The drag'n drop ended */
	@Output() dragEnd = new EventEmitter<any>();

	dragDropEnabled = true;
	dragDropInProgress = false;



	constructor(private kanbanSrv: Kanban2Service, private el: ElementRef) {
		super();
	}

	ngOnInit() { }

	ngAfterContentInit() {
		if (this.dragDropEnable$) {
			this.dragDropEnable$.pipe(
				takeUntil(this._destroy$)
			).subscribe(dragDropEnabled => {
				this.dragDropEnabled = dragDropEnabled;
			});
		}
	}

	/** Dispatch the dragStart event through the kanban service */
	onDragStart(event) {
		this.dragDropInProgress = true;
		const itemsToDrop = this.getDataForDragnDrop();
		this.kanbanSrv.dragStart$.next({ namespace: this.namespace, data: itemsToDrop });
		this.dragStart.emit();
	}

	/** Dispatch the dragEnd event through the kanban service */
	onDragEnd(event) {
		this.dragDropInProgress = false;
		const itemsToDrop = this.getDataForDragnDrop();
		this.kanbanSrv.dragEnd$.next({ namespace: this.namespace, data: itemsToDrop });
		this.dragEnd.emit();
	}

	getDataForDragnDrop() {
		if (this.selectedItems && this.selectedItems.size > 0) {
			if (this.selectedItems.has(this.data.id)) {
				return Array.from(this.selectedItems.values());
			} else {
				return Array.from(this.selectedItems.values()).concat([this.data]);
			}
		} else {
			return [this.data];
		}
	}
}

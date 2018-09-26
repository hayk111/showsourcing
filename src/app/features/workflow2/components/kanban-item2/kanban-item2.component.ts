import { Component, ElementRef, Injectable, Input, OnInit, ContentChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { KanbanService } from '~features/workflow/services/kanban.service';
import { KanbanItemCardComponent } from '~shared/product-common/components/kanban-item-card/kanban-item-card.component';
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
	/** The drag'n drop started */
	@Output() dragStart = new EventEmitter<any>();
	/** The drag'n drop ended */
	@Output() dragEnd = new EventEmitter<any>();

	dragDropEnabled = true;



	constructor(private kanbanSrv: KanbanService, private el: ElementRef) {
		super();
	}

	ngOnInit() {}

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
		this.kanbanSrv.dragStart$.next({ namespace: this.namespace, data: this.data });
		this.dragStart.emit();
	}

	/** Dispatch the dragEnd event through the kanban service */
	onDragEnd(event) {
		this.kanbanSrv.dragEnd$.next({ namespace: this.namespace, data: this.data });
		this.dragEnd.emit();
	}
}

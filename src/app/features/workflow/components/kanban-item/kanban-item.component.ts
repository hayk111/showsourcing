import { Component, ElementRef, Injectable, Input, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { KanbanService } from '~features/workflow/services/kanban.service';
import { KanbanItemCardComponent } from '~features/workflow/components/kanban-item-card/kanban-item-card.component';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'kanban-item-app',
	templateUrl: './kanban-item.component.html',
	styleUrls: ['./kanban-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItemComponent extends AutoUnsub implements OnInit, AfterContentInit {
	/** The data associated with the item */
	@Input() data;
	/** The index associated with the item */
	@Input() index;
	/** The namespace associated with the item */
	@Input() namespace;

	@ContentChild(KanbanItemCardComponent) card: KanbanItemCardComponent;

	dragDropEnabled: boolean;

	constructor(private kanbanSrv: KanbanService, private el: ElementRef) {
		super();
	}

	ngOnInit() {}

	ngAfterContentInit() {
		if (this.card) {
			this.card.dragDropEnable.pipe(
				takeUntil(this._destroy$)
			).subscribe(dragDropEnabled => {
				this.dragDropEnabled = dragDropEnabled;
			});
		}
	}

	/** Dispatch the dragStart event through the kanban service */
	onDragStart(event) {
		this.kanbanSrv.dragStart$.next({ namespace: this.namespace, data: this.data });
	}

	/** Dispatch the dragEnd event through the kanban service */
	onDragEnd(event) {
		this.kanbanSrv.dragEnd$.next({ namespace: this.namespace, data: this.data });
	}
}

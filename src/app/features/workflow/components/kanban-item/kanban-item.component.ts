import { Component, ElementRef, Injectable, Input, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { KanbanService } from '~features/workflow/services/kanban.service';

@Component({
	selector: 'kanban-item-app',
	templateUrl: './kanban-item.component.html',
	styleUrls: ['./kanban-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItemComponent implements OnInit {
	/** The data associated with the item */
	@Input() data;
	/** The index associated with the item */
	@Input() index;
	/** The namespace associated with the item */
	@Input() namespace;

	constructor(private kanbanSrv: KanbanService, private el: ElementRef) {}

	ngOnInit() {}

	/** Dispatch the dragStart event through the kanban service */
	onDragStart(event) {
		this.kanbanSrv.dragStart$.next({ namespace: this.namespace, data: this.data });
	}

	/** Dispatch the dragEnd event through the kanban service */
	onDragEnd(event) {
		this.kanbanSrv.dragEnd$.next({ namespace: this.namespace, data: this.data });
	}
}

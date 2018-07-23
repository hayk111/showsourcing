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
	@Input() data;
	@Input() index;
	@Input() namespace;

	constructor(private kanbanSrv: KanbanService, private el: ElementRef) {}

	ngOnInit() {}

	onDragStart(event) {
		this.kanbanSrv.dragStart$.next({ namespace: this.namespace, data: this.data });
	}

	onDragEnd(event) {
		this.kanbanSrv.dragEnd$.next({ namespace: this.namespace, data: this.data });
	}
}

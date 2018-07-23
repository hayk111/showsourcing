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

	constructor(private kanbanSrv: KanbanService, private el: ElementRef) {}

	ngOnInit() {}

	allowDrag(event) {
		event.preventDefault();
	}

	onDragStart(event) {
		// passing data to service so we can retrieve it
		this.kanbanSrv.dataTransfer = this.data;
		this.kanbanSrv.index = this.index;
		this.kanbanSrv.isDragging = true;
	}

	onDragEnd(event) {
		this.kanbanSrv.isDragging = false;
	}
}

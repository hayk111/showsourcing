import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injectable,
	Input,
	OnInit,
	Output,
} from '@angular/core';

import { KanbanService } from '~features/workflow/services/kanban.service';

@Component({
	selector: 'kanban-col-app',
	templateUrl: './kanban-col.component.html',
	styleUrls: ['./kanban-col.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColComponent implements OnInit {
	over = false;
	@Input() bag;
	@Input() label: string;
	@Input() borderColor: string;
	@Output() itemDropped = new EventEmitter<any>();

	constructor(private kanbanSrv: KanbanService) { }

	ngOnInit() { }

	onDragOver(event) {
		event.preventDefault();
		this.over = true;
	}

	isOver() {
		return this.over && this.kanbanSrv.isDragging && this.kanbanSrv.leavingBag !== this.bag;
	}

	onDragStart(event) {
		this.over = false;
		const data = this.kanbanSrv.dataTransfer;
		this.kanbanSrv.leavingBag = this.bag;
	}

	onDrop(event) {
		this.over = false;
		const data = this.kanbanSrv.dataTransfer;
		const leavingBag = this.kanbanSrv.leavingBag;
		const enteringBag = this.bag;
		this.itemDropped.emit({ data, leavingBag, enteringBag, event });
		// event.preventDefault();
	}

	onDragLeave(event) {
		this.over = false;
	}
}

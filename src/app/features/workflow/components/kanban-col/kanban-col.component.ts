import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injectable,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AutoUnsub } from '~utils/auto-unsub.component';
import { KanbanService } from '../../services/kanban.service';

@Component({
	selector: 'kanban-col-app',
	templateUrl: './kanban-col.component.html',
	styleUrls: ['./kanban-col.component.scss'],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColComponent extends AutoUnsub implements OnInit {
	over = false;
	@Input() bag;
	@Input() data;
	@Input() label: string;
	@Input() namespace: string;
	@Input() borderColor: string;
	@Output() itemDropped = new EventEmitter<any>();

	droppableArea = false;
	sourceArea = false;
	enteredArea = false;

	constructor(private kanbanSrv: KanbanService) {
		super();
	}

	ngOnInit() {
		this.kanbanSrv.dragStart$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ namespace }) => {
			if (namespace) {
				this.sourceArea = (namespace === this.namespace);
				this.droppableArea = (namespace !== this.namespace);
			}
		});

		this.kanbanSrv.dragEnd$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ data, namespace }) => {
			this.sourceArea = false;
			this.droppableArea = false;
			this.enteredArea = false;
		});

		this.kanbanSrv.itemEntered$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ namespace }) => {
			if (namespace && (namespace === this.namespace) && !this.sourceArea) {
				this.enteredArea = true;
			}
		});

		this.kanbanSrv.itemLeft$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ namespace }) => {
			if (namespace && (namespace === this.namespace) && !this.sourceArea) {
				this.enteredArea = false;
			}
		});
	}

}

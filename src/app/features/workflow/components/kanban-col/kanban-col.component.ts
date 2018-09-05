import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injectable,
	Input,
	OnInit,
	Output
} from '@angular/core';
import {
	DomSanitizer,
	SafeHtml,
	SafeUrl,
	SafeStyle
} from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';

import { AutoUnsub } from '~utils/auto-unsub.component';
import { KanbanService } from '~features/workflow/services/kanban.service';

@Component({
	selector: 'kanban-col-app',
	templateUrl: './kanban-col.component.html',
	styleUrls: ['./kanban-col.component.scss'],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColComponent extends AutoUnsub implements OnInit {
	over = false;
	/** The data associated with the column */
	@Input() data;
	/** The label of the column */
	@Input() label: string;
	/** The namespace associated with the column */
	@Input() namespace: string;
	@Input() borderColor: string;
	/** Doesn't take part of drag'n drop */
	@Input() disabled: boolean;
	/** The checkbox is checked or not */
	@Input() checked: boolean;
	/** The item is dropped in the column */
	@Output() itemDropped = new EventEmitter<any>();
	@Output() checkChange = new EventEmitter<boolean>();

	/** The column is a droppable area */
	droppableArea = false;
	/** The column is the source area of the drag'n drop */
	sourceArea = false;
	/** The item entered into the column with the drag'n drop */
	enteredArea = false;
	/** The color of the separator */
	separatorColor: any;
	/** A drag'n drop is in progress */
	dragnDropInProgress: boolean;

	constructor(private kanbanSrv: KanbanService, private sanitization: DomSanitizer) {
		super();
	}

	ngOnInit() {
		// Handle dragStart through the kanban service
		this.kanbanSrv.dragStart$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ namespace }) => {
			this.sourceArea = (namespace === this.namespace);
			this.droppableArea = (!this.disabled && namespace !== this.namespace);
		});

		/** Don't register on drag'n drop if disabled */
		if (this.disabled) {
			return;
		}

		this.kanbanSrv.dragStart$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ data, namespace }) => {
			this.dragnDropInProgress = true;
		});

		// Handle dragEnd through the kanban service
		this.kanbanSrv.dragEnd$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ data, namespace }) => {
			this.sourceArea = false;
			this.droppableArea = false;
			this.enteredArea = false;
			this.dragnDropInProgress = false;
		});

		// Handle itemEntered through the kanban service
		this.kanbanSrv.itemEntered$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ namespace }) => {
			if (namespace && (namespace === this.namespace) && !this.sourceArea) {
				this.enteredArea = true;
			}
		});

		// Handle itemLeft through the kanban service
		this.kanbanSrv.itemLeft$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ namespace }) => {
			if (namespace && (namespace === this.namespace) && !this.sourceArea) {
				this.enteredArea = false;
			}
		});
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injectable,
	Input,
	OnInit,
	Output,
	ChangeDetectorRef
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
	selector: 'kanban-col2-app',
	templateUrl: './kanban-col2.component.html',
	styleUrls: ['./kanban-col2.component.scss'],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanCol2Component extends AutoUnsub implements OnInit {
	over = false;
	/** The data associated with the column */
	@Input() data;
	/** The label of the column */
	@Input() label: string;
	/** The namespace associated with the column */
	@Input() namespace: any;
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

	constructor(private kanbanSrv: KanbanService, private sanitization: DomSanitizer, private cdr: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		// Handle dragStart through the kanban service
		this.kanbanSrv.dragStart$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ data, namespace }) => {
			this.sourceArea = (namespace === this.namespace);
			this.droppableArea = (!this.disabled && data.status.status.id !== this.namespace.id);
			this.dragnDropInProgress = true;
			this.cdr.markForCheck();
		});

		// this.kanbanSrv.dragStart$.pipe(
		// 	takeUntil(this._destroy$)
		// ).subscribe(({ data, namespace }) => {
		// });

		// Handle dragEnd through the kanban service
		this.kanbanSrv.dragEnd$.pipe(
			takeUntil(this._destroy$)
		).subscribe(({ data, namespace }) => {
			if (!this.disabled) {
				this.sourceArea = false;
				this.droppableArea = false;
				this.enteredArea = false;
			}
			this.dragnDropInProgress = false;
			this.cdr.markForCheck();
		});

		/** Don't register on other events if disabled */
		if (this.disabled) {
			return;
		}

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

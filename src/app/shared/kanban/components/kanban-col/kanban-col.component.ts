import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import {
	ChangeDetectionStrategy, Component, EventEmitter,
	Input, OnInit, Output, TemplateRef, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { KanbanColumn } from '~shared/kanban/interfaces';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'kanban-col-app',
	templateUrl: './kanban-col.component.html',
	styleUrls: ['./kanban-col.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// view encapsulation none because the preview is rendered outside this node in
	// the dom
	encapsulation: ViewEncapsulation.None
})
export class KanbanColComponent extends TrackingComponent implements OnInit {
	@Input() col: KanbanColumn;
	@Input() cardTemplate: TemplateRef<any>;
	@Input() connectedLists: string[];
	@Input() selection: Map<string, any>;
	@Output() selectAll = new EventEmitter<any[]>();
	@Output() unselectAll = new EventEmitter<any[]>();
	@Output() drop = new EventEmitter<CdkDragDrop<any>>();

	/** whether multiple items are dragged simultaneously via selection */
	private multipleDrag: boolean;
	/** the currently dragged id */
	draggedId: string;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	getStyle(col: KanbanColumn) {
		return {
			'border-top-color': `var(--color-${col.color})`
		};
	}

	onDrop(event: CdkDragDrop<any>) {
		if (this.selection.size > 0) {
			//
		} else {
			this.drop.emit(event);
		}
	}


}

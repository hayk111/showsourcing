import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Status } from '~core/models/status.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'workflow-managament-table-app',
	templateUrl: './workflow-managament-table.component.html',
	styleUrls: ['./workflow-managament-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowManagamentTableComponent {
	@Input() statuses: Status[];
	@Output() update = new EventEmitter<Status[]>();
	@Output() previewClick = new EventEmitter<Status>();

	onDrop(event: CdkDragDrop<string[]>) {
		// index 0 cannot be changed
		const index = Math.max(event.currentIndex, 1);
		moveItemInArray(this.statuses, event.previousIndex, index);
		this.statuses.forEach((status, i) => {
			status.step = i;
		});
		this.update.emit(this.statuses);
	}

	onEditableClose(isCancel: boolean, value: string, status) {
		if (isCancel)
			return;
		status.name = value;
		this.update.emit(this.statuses);
	}
}

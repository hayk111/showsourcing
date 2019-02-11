import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Status } from '~core/models/status.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EntityMetadata } from '~core/models';

@Component({
	selector: 'workflow-managament-table-app',
	templateUrl: './workflow-managament-table.component.html',
	styleUrls: ['./workflow-managament-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowManagamentTableComponent {

	@Input() statuses: Status[];
	@Input() typeEntity: EntityMetadata;
	@Output() update = new EventEmitter<Status[]>();
	@Output() delete = new EventEmitter<string>();
	categories = ['inProgress', 'validated', 'refused'];

	onDrop(event: CdkDragDrop<string[]>) {
		// index 0 cannot be changed
		const index = Math.max(event.currentIndex, 1);
		moveItemInArray(this.statuses, event.previousIndex, index);
		this.statuses.forEach((status, i) => {
			status.step = i + 1;
		});
		this.update.emit(this.statuses);
	}

	onEditableClose(isCancel: boolean, value: string, status) {
		if (isCancel)
			return;
		status.name = value;
		this.update.emit([status]);
	}

	getType(status) {
		// by default is secondary since is the color for NEW elements
		if (status) {
			switch (status.category) {
				case 'inProgress':
					return 'in-progress';
				case 'validated':
					return 'success';
				case 'refused':
					return 'warn';
				case 'inspiration':
					return 'secondary-light';
				default:
					return 'secondary';
			}
		}
	}
}

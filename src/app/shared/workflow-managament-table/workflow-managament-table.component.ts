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
	@Output() update = new EventEmitter<Status>();

	onDrop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);

	}
}

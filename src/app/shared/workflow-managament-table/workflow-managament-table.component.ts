import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Status } from '~core/models/status.model';

@Component({
	selector: 'app-workflow-managament-table',
	templateUrl: './workflow-managament-table.component.html',
	styleUrls: ['./workflow-managament-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowManagamentTableComponent {
	@Input() statuses: Status[];
	@Output() update = new EventEmitter<Status>();


}

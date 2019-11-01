import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableConfig } from '~core/list-page';
import { Task } from '~core/models';
import { TaskService } from '~core/entity-services';

const tableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 590, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 80, sortProperty: 'status.step', sortable: false },
};

@Component({
	selector: 'todo-box-task-preview-app',
	templateUrl: './todo-box-task-preview.component.html',
	styleUrls: ['./todo-box-task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoBoxTaskPreviewComponent implements OnInit {
	@Input() rows: Task[];
	@Output() updated = new EventEmitter<any>();

	tableConfig = tableConfig;

	constructor(private taskSrv: TaskService) { }

	ngOnInit() {
		this.taskSrv.taskListUpdate$.subscribe(_ => this.updated.emit());
	}

}

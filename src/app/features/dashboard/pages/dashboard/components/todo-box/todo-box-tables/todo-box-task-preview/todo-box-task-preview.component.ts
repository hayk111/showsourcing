import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '~core/erm/models';
import { TaskService } from '~core/erm/services';
import { TableConfig } from '~common/tables/entity-table.component';

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

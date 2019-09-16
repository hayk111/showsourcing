import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '~core/list-page';
import { Task } from '~core/models';

const tableConfig: TableConfig = {
	reference: { title: 'reference', width: 450, sortProperty: 'name' },
	status: { title: 'status', width: 80, sortProperty: 'status.step', sortable: false },
};

@Component({
	selector: 'todo-box-task-preview-app',
	templateUrl: './todo-box-task-preview.component.html',
	styleUrls: ['./todo-box-task-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoBoxTaskPreviewComponent implements OnInit {
	@Input() rows: Task[];
	tableConfig = tableConfig;

	constructor(
	) { }

	ngOnInit() {
	}

}

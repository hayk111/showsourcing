import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page';
import { ERM, Task } from '~core/models';
import { ID } from '~utils/id.utils';
import { TaskService } from '~core/entity-services';
import { User } from 'getstream';

const bigTableConfig: TableConfig = {
	done: { name: 'done', translationKey: '', width: 0, sortable: false },
	reference: { name: 'reference', translationKey: 'reference', width: 80, sortProperty: 'reference' },
	name: { name: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
	product: { name: 'product', translationKey: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 150, sortProperty: 'supplier.name' },
	dueDate: { name: 'due date', translationKey: 'due-date', width: 103, sortProperty: 'dueDate' },
	assignee: { name: 'assigned to', translationKey: 'assigned-to', width: 140, sortProperty: 'assignee.firstName' },
	status: { name: 'status', translationKey: 'status', width: 85, sortProperty: 'status.step', sortable: false },
};

const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 590, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 80, sortProperty: 'status.step', sortable: false },
};

const smallTableConfig: TableConfig = {
	done: { name: 'done', translationKey: 'done', width: 50 },
	name: { name: 'name assignee', translationKey: 'name', width: 240, sortProperty: 'name' },
	dueDate: { name: 'due date small', translationKey: 'due-date', width: 80, sortProperty: 'dueDate' },
};

const itsTheSameDesignEveryWhereGuys: TableConfig = {
	done: { name: 'done', translationKey: 'done', width: 24 },
	name: { name: 'name assignee', translationKey: 'name', width: 340, sortProperty: 'name' },
	// aboutCompletion: { name: 'about completion', translationKey: 'name', width: 240, sortProperty: 'name' },
	assignee: {
		name: 'assigned to',
		translationKey: 'assigned-to',
		width: 40,
		sortProperty: 'assignee.firstName',
		showOnHover: true,
		metadata: { nameOnly: true }
	},
	status: { name: 'status', translationKey: 'status', width: 80, sortProperty: 'status.step', sortable: false, showOnHover: true },
	dueDate: { name: 'due date small', translationKey: 'due-date', width: 50, sortProperty: 'dueDate', showOnHover: true },
};

@Component({
	selector: 'task-table-app',
	templateUrl: './task-table.component.html',
	styleUrls: [
		'./task-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTableComponent extends EntityTableComponent<Task> implements OnInit {

	@Input() tableConfigType: TableConfigType = 'big';
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();

	columns = ['done', 'reference', 'name', 'product', 'supplier', 'dueDate', 'assignee', 'status'];
	erm = ERM;

	constructor(
		public translate: TranslateService,
		private taskSrv: TaskService
	) { super(); }

	ngOnInit() {
		this.tableConfig = this.getTableFromType();
		super.ngOnInit();
	}

	getTableFromType() {
		switch (this.tableConfigType) {
			case 'big':
				return bigTableConfig;
			case 'medium':
				return mediumTableConfig;
			case 'small':
				return smallTableConfig;
			case 'itsTheSameDesignEveryWhereGuys':
				return itsTheSameDesignEveryWhereGuys;
		}
	}

	toggleStatus(task: Task) {
		this.taskSrv.update({ id: task.id, done: !task.done}).subscribe();
	}

	changeAssignee(task: Task, assignee: User) {
		this.taskSrv.update({ id: task.id, assignee }).subscribe();
	}
}

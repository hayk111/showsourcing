import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskService } from '~core/entity-services';
import { ERM, Task } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { DynamicField } from '~shared/dynamic-forms';
import { NotificationService, NotificationType } from '~shared/notifications';
import { translate, AutoUnsub } from '~utils';
import { ListPageService, ListPageKey } from '~core/list-page';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'creation-task-dlg-app',
	templateUrl: './creation-task-dlg.component.html',
	styleUrls: ['./creation-task-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class CreationTaskDlgComponent extends AutoUnsub implements OnInit {

	@Input() task: Task;

	dynamicFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{
			name: 'assignee',
			type: 'selector',
			label: translate('assigned to'),
			metadata: {
				target: ERM.USER.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{ name: 'dueDate', type: 'date', label: translate('due date') },
		{ name: 'description', type: 'textarea', label: translate('description'), metadata:  { rows: 10 } },
		{
			name: 'product',
			type: 'selector',
			label: translate('Linked to Product'),
			metadata: {
				target: ERM.PRODUCT.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{
			name: 'supplier',
			type: 'selector',
			label: translate('Linked to Supplier'),
			metadata: {
				target: ERM.SUPPLIER.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true,
				hasBadge: true,
				width: 495
			},
		}
	];
	createAnother = false;

	constructor(
		private dlgSrv: DialogService,
		private taskSrv: TaskService,
		private notifSrv: NotificationService,
		private listSrv: ListPageService<Task, TaskService>,
		protected route: ActivatedRoute,
	) {
		super();
		const routeId = this.route.snapshot.params.id;
		this.listSrv.setup({
			key: `${ListPageKey.TASK}-${routeId}`,
			entitySrv: this.taskSrv,
			searchedFields: ['name', 'supplier.name', 'product.name'],
			selectParams: {
				sortBy: 'creationDate',
				descending: true,
				query: 'deleted == false'
			},
			entityMetadata: ERM.TASK,
			originComponentDestroy$: this._destroy$
		});
	}

	ngOnInit() {
		if (!this.task) {
			this.task = new Task();
		}
	}

	updateTask(task: Task) {
		this.task = { ...this.task, ...task };
	}

	save ()  {
		if (this.task && this.task.name) {
			this.taskSrv.create(this.task).subscribe(task => {
				if (this.createAnother) {
					this.dlgSrv.open(CreationTaskDlgComponent, { task });
				} else {
					this.close();
				}
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: `Task created`,
					message: 'Your task has been created with success'
				});
				this.listSrv.refetch({});
			},
			err => {
				this.notifSrv.add({
					type: NotificationType.ERROR,
					title: `Task created`,
					message: 'Your task could not been created'
				});
			});
		}
	}
	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.OK, data: { task: this.task } });
	}

}

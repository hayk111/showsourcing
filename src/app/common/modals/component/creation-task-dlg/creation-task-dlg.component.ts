import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskDescriptor } from '~core/descriptors';
import { TaskService, UserService } from '~core/entity-services';
import { Product, Supplier, Task } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { translate, uuid } from '~utils';

@Component({
	selector: 'creation-task-dlg-app',
	templateUrl: './creation-task-dlg.component.html',
	styleUrls: ['./creation-task-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class CreationTaskDlgComponent implements OnInit {

	@Input() task: Task;
	@Input() product: Product;
	@Input() supplier: Supplier;
	@Input() createAnother = false;

	taskDescriptor: TaskDescriptor;


	constructor(
		private dlgSrv: DialogService,
		private taskSrv: TaskService,
		private notifSrv: NotificationService,
		private userSrv: UserService
	) {
	}

	ngOnInit() {
		this.taskDescriptor = new TaskDescriptor([
			'name', 'assignee', 'dueDate', 'description', 'product', 'supplier'
		]);
		this.taskDescriptor.modify([
			{ name: 'name', metadata: { placeholder: translate('Task name') } },
			{ name: 'assignee', metadata: { placeholder: translate('select assignee'), width: 495 } },
			{
				name: 'product',
				label: translate('Linked to Product'),
				metadata: {
					placeholder: translate('search for your product'),
					width: 495
				}
			},
			{
				name: 'supplier',
				label: translate('Linked to Supplier'),
				metadata: {
					placeholder: translate('search for your supplier'),
					width: 495
				}
			}
		]);

		if (!this.task) {
			const supplier = this.supplier ? this.supplier : (this.product && this.product.supplier);
			this.task = new Task({
				...this.product && { product: { id: this.product.id, name: this.product.name } },
				...supplier && { supplier: { id: supplier.id, name: supplier.name } },
				assignee: { id: this.userSrv.userSync.id, firstName: this.userSrv.userSync.firstName, lastName: this.userSrv.userSync.lastName }
			});
		}
	}

	updateTask(task: Task) {
		this.task = { ...this.task, ...task };
	}

	save() {
		if (this.task && this.task.name) {
			this.taskSrv.create(this.task).subscribe(task => {
				if (this.createAnother) {
					task = this.resetIds(task);
					this.dlgSrv.open(CreationTaskDlgComponent, { task, createAnother: true });
				} else {
					this.close();
				}
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: `Task created`,
					message: 'Your task has been created with success'
				});
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

	private resetIds(task) {
		task = { ...task, id: uuid(), name: '', description: '' };
		return task;
	}

}

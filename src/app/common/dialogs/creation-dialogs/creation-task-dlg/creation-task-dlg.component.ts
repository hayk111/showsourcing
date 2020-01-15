import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskDescriptor } from '~core/descriptors';
import { TaskService, UserService } from '~core/entity-services';
import { Product, Supplier, Task } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
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
		private toastSrv: ToastService,
		private userSrv: UserService
	) { }

	ngOnInit() {
		const user = this.userSrv.userSync;
		const assignee = {
			id: user.id,
			lastName: user.lastName,
			firstName: user.firstName
		};
		const today = new Date();
		const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
		this.taskDescriptor = new TaskDescriptor([
			'name', 'assignee', 'dueDate', 'description', 'product', 'supplier'
		]);
		this.taskDescriptor.modify([
			{ name: 'name', metadata: { placeholder: 'task-name' } },
			{ name: 'assignee', metadata: { placeholder: 'select-assignee', width: 495 } },
			{
				name: 'product',
				label: 'linked-to-product',
				metadata: {
					placeholder: 'search-your-product',
					width: 495
				}
			},
			{
				name: 'supplier',
				label: 'linked-to-supplier',
				metadata: {
					placeholder: 'search-your-supplier',
					width: 495
				}
			}
		]);

		if (!this.task) {
			const supplier = this.supplier ? this.supplier : (this.product && this.product.supplier);
			this.task = new Task({
				...this.product && { product: { id: this.product.id, name: this.product.name } },
				...supplier && { supplier: { id: supplier.id, name: supplier.name } },
				// dueDate: tomorrow, not working
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
					this.taskSrv.onUpdateTaskList();
					this.dlgSrv.open(CreationTaskDlgComponent, { task, createAnother: true });
				} else {
					this.taskSrv.onUpdateTaskList();
					this.close();
				}
				this.toastSrv.add({
					type: ToastType.SUCCESS,
					title: `Task created`,
					message: 'Your task has been created with success'
				});
			},
				err => {
					this.toastSrv.add({
						type: ToastType.ERROR,
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

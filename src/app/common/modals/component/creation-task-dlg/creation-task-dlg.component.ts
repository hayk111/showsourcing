import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskService } from '~core/entity-services';
import { ERM, Task, Product, Supplier } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { DynamicField } from '~shared/dynamic-forms';
import { NotificationService, NotificationType } from '~shared/notifications';
import { translate } from '~utils';

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

	dynamicFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name'), placeholder: translate('Task name'), },
		{
			name: 'assignee',
			type: 'selector',
			label: translate('assigned to'),
			metadata: {
				target: ERM.USER.singular,
				type: 'entity',
				placeholder: translate('select assignee'),
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{ name: 'dueDate', type: 'date', label: translate('due date') },
		{ name: 'description', type: 'textarea', label: translate('Description'), metadata:  { rows: 5 } },
		{
			name: 'product',
			type: 'selector',
			label: translate('Linked to Product'),
			metadata: {
				target: ERM.PRODUCT.singular,
				type: 'entity',
				placeholder: translate('search for your product'),
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
				placeholder: translate('search for your supplier'),
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
	) {
	}

	ngOnInit() {
		if (!this.task) {
			const supplier = this.supplier ? this.supplier : (this.product && this.product.supplier);
			this.task = new Task({
				...this.product && {product: {id: this.product.id, name: this.product.name}},
				...supplier && {supplier: {id: supplier.id, name: supplier.name}}
			});
		}
	}

	updateTask(task: Task) {
		this.task = { ...this.task, ...task };
	}

	save ()  {
		if (this.task && this.task.name) {
			this.taskSrv.create(this.task).subscribe(task => {
				if (this.createAnother) {
					this.dlgSrv.open(CreationTaskDlgComponent, { task: { ...this.task, name: '', description: ''} });
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

}

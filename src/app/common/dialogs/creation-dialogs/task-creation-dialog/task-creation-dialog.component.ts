import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { Task, Product, Supplier, Descriptor } from '~core/erm3';
import { DynamicFormComponent } from '~shared/descriptor/components/dynamic-form/dynamic-form.component';
import { descriptorMock } from '../product-creation-dialog/_temporary-descriptor-product.mock';

@Component({
	selector: 'creation-task-dialog-app',
	templateUrl: './task-creation-dialog.component.html',
	styleUrls: ['./task-creation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [],
})
export class TaskCreationDialogComponent implements OnInit {

	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
	@Input() product: Product;
	@Input() supplier: Supplier;
	@Input() createAnother = false;

	taskDescriptor: Descriptor;

		// Descriptor options
	descriptor: Descriptor = descriptorMock as any;
	style = 'form';
	columnAmount = 1;
	updateOn = 'change';
	descriptorProperties = [];
	task: Task = {};

	constructor(
		private dlgSrv: DialogService,
	) {}

	ngOnInit() {
	}

	toggleCheckbox() {
		this.createAnother = !this.createAnother;
	}

	updateTask(customProperties: Task) {
		this.task.properties = customProperties;
	}

	save() {
		if (!this.task.properties || !this.task.name) return;
		this.dlgSrv.data({ ...this.product });
		this.createAnother ?	this.form.reset() : this.dlgSrv.close();
	}

	cancel() {
		this.dlgSrv.cancel();
	}

}

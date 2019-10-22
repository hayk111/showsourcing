import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page';
import { ERM, Sample, Task, User } from '~core/models';
import { ID } from '~utils/id.utils';
import { TaskService, SampleService } from '~core/entity-services';

const bigTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	product: { name: 'product', translationKey: 'product', width: 190, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.name' },
	comments: { name: 'comments', translationKey: 'comments', width: 140 },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	type: { name: 'type', translationKey: 'type', width: 140, sortProperty: 'type' },
	activities: { name: 'activities', translationKey: 'activities', width: 250, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'createdBy.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
};

const mediumTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 240, sortProperty: 'name' },
	product: { name: 'product', translationKey: 'product', width: 180, sortProperty: 'product.name' },
	status: { name: 'status', translationKey: 'status', width: 110, sortProperty: 'status.step' },
};

const smallTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 130, sortProperty: 'status.step' },
};

@Component({
	selector: 'samples-table-app',
	templateUrl: './samples-table.component.html',
	styleUrls: [
		'./samples-table.component.scss',
		'../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplesTableComponent extends EntityTableComponent<Sample> implements OnInit {
	columns = ['name', 'product', 'supplier', 'type', 'assignee', 'status', 'activities', 'createdBy', 'createdOn'];
	@Input() tableConfigType: TableConfigType = 'big';
	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();
	@Output() archive = new EventEmitter<Sample>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	erm = ERM;

	constructor(
		public translate: TranslateService,
		private sampleSrv: SampleService
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
		}
	}

	changeAssignee(sample: Sample, assignee: User) {
		this.sampleSrv.update({ id: sample.id, assignee }).subscribe();
	}

}

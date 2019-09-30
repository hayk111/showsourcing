import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { ID } from '~utils/id.utils';

const bigTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	product: { name: 'product', translationKey: 'product', width: 190, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.name' },
	comments: { name: 'comments', translationKey: 'comments', width: 140 },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	creationDate: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
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
	selector: 'sample-table-app',
	templateUrl: './sample-table.component.html',
	styleUrls: [
		'./sample-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleTableComponent extends EntityTableComponent<Sample> implements OnInit {
	columns = ['name', 'assignee', 'product', 'supplier', 'comments', 'status', 'creationDate'];
	@Input() tableConfigType: TableConfigType = 'big';
	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();

	erm = ERM;

	constructor(public translate: TranslateService) { super(); }

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

}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, Input } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { ID } from '~utils/id.utils';

const tableConfig: TableConfig = {
	name: { title: 'name', width: 190, sortProperty: 'name' },
	assignee: { title: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	product: { title: 'product', width: 190, sortProperty: 'product.name' },
	supplier: { title: 'supplier', width: 190, sortProperty: 'supplier.name' },
	comments: { title: 'comments', width: 140 },
	status: { title: 'status', width: 190, sortProperty: 'status.step' },
	creationDate: { title: 'created on', width: 190, sortProperty: 'creationDate' },
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
export class SampleTableComponent extends EntityTableComponent<Sample> {
	columns = [ 'name', 'assignee', 'product', 'supplier', 'comments', 'status', 'creationDate' ];
	@Input() tableConfig = tableConfig;
	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();

	erm = ERM;

	constructor() { super(); }


}

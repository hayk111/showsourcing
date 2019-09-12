import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { ID } from '~utils/id.utils';



const tableConfig: TableConfig = {
	name: { title: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	assignee: { title: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	product: { title: 'product', translationKey: 'product', width: 190, sortProperty: 'product.name' },
	supplier: { title: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.name' },
	comments: { title: 'comments', translationKey: 'comments', width: 140 },
	status: { title: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	creationDate: { title: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
};

@Component({
	selector: 'sample-list-view-app',
	templateUrl: './sample-list-view.component.html',
	styleUrls: [
		'./sample-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListViewComponent extends ListViewComponent<Sample> {
	columns = [ 'name', 'assignee', 'product', 'supplier', 'comments', 'status', 'creationDate' ];
	tableConfig = tableConfig;
	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();

	erm = ERM;

	constructor() { super(); }


}

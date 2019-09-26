import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, Input } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { ID } from '~utils/id.utils';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	product: { name: 'product', translationKey: 'product', width: 190, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.name' },
	comments: { name: 'comments', translationKey: 'comments', width: 140 },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	creationDate: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
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
	columns = ['name', 'assignee', 'product', 'supplier', 'comments', 'status', 'creationDate'];
	@Input() tableConfig = tableConfig;
	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();

	erm = ERM;

	constructor(public translate: TranslateService) { super(); }


}

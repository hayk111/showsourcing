import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfigType } from '~common/tables/entity-table.component';
import { Supplier } from '~models';
import { bigTableConfig, mediumTableConfig } from './config';

@Component({
	selector: 'suppliers-table-app',
	templateUrl: './suppliers-table.component.html',
	styleUrls: [
		'./suppliers-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliersTableComponent extends EntityTableComponent<Supplier> implements OnInit {

	columns = [
		'logo',
		'name',
		'preview',
		'categories',
		'productCount',
		'taskCount',
		'sampleCount',
		'favorite',
		'rating',
		'status',
		'assignee',
		'country',
		'createdBy',
		'creationDate',
	];

	@Input() tableConfigType: TableConfigType = 'big';
	@Output() archive = new EventEmitter<Supplier>();

	constructor(public translate: TranslateService) {
		super();
	}

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
			default:
				return bigTableConfig;
		}
	}

}

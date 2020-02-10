import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Supplier } from '~core/erm';
import { config } from './config';

@Component({
	selector: 'suppliers-table-app',
	templateUrl: './suppliers-table.component.html',
	styleUrls: [
		'./suppliers-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliersTableComponent extends EntityTableComponent<Supplier> implements OnInit {
	static DEFAULT_COLUMNS = [
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
	static DEFAULT_TABLE_CONFIG = config;
	@Input() columns = SuppliersTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = SuppliersTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(public translate: TranslateService) {
		super();
	}

}

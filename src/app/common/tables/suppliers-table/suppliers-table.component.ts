import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Supplier, api } from 'lib';
import { config } from './config';
import { ListHelper2Service } from '~core/list-page2';

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
		'favorite',
		'rating',
		'status',
		'assignee',
		'country',
		'createdBy',
	];
	static DEFAULT_TABLE_CONFIG = config;
	@Input() columns = SuppliersTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = SuppliersTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(public listHelper: ListHelper2Service) {
		super();
	}

}

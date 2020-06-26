import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Product } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { config } from './config';

@Component({
	selector: 'products-table-app',
	templateUrl: './products-table.component.html',
	styleUrls: [
		'./products-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent extends EntityTableComponent<Product> {
	static DEFAULT_COLUMNS = [
		'logo',
		'reference',
		'name',
		'preview',
		'price',
		'moq',
		'supplier',
		'category',
		'favorite',
		'rating',
		'status',
		'assignee',
		'createdBy',
		'creationDate'
	];
	static DEFAULT_TABLE_CONFIG = config;
	@Input() columns = ProductsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openAddTaskDialog = new EventEmitter<Product>();
	@Output() openAddSampleDialog = new EventEmitter<Product>();

	constructor(public listHelper: ListHelper2Service) {
		super();
	}

	updatePrice(productId: string, inputValue: any, additionalFields: any) {
		let currency;

		if (inputValue.value && inputValue.value.value) {
			currency = inputValue.value.currency || 'USD';
		} else {
			currency = inputValue.value ? inputValue.value.currency : null;
		}

		this.propertyUpdated.emit({
			entityId: productId,
			entityType: 'price',
			value: {
				...additionalFields,
				value: inputValue.value ? inputValue.value.value : null,
				currency,
			}
		});
	}
}

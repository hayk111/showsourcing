import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Product } from '~core/erm';
import { api } from 'lib';
import { ListFuseHelperService } from '~core/list-page2';
import { config } from './config';
import { TeamService } from '../../../core/auth/services/team.service';

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

	constructor(public listHelper: ListFuseHelperService) {
		super();
	}

	updatePrice(product: Product, inputValue: any) {
		console.log('ProductsTableComponent -> updatePrice -> product667', product, inputValue);
		let currency;

		if (inputValue.value && inputValue.value.value) {
			currency = inputValue.value.currency || 'USD';
		} else {
			currency = inputValue.value ? inputValue.value.currency : null;
		}

		api.Product.update([{
			id: product.id,
			propertiesMap: {
				doctor: 'Dre'
			}
		}]).subscribe(updated => {
			console.log('ProductsTableComponent -> updatePrice -> updated', updated);
		});

		// this.propertyUpdated.emit({
		// 	entity: product,
		// 	propertyName,
		// 	value: {
		// 		value: inputValue.value ? inputValue.value.value : null,
		// 		currency,
		// 	}
		// });
	}
}

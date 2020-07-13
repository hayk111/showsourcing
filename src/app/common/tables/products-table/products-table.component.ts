import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { api } from 'lib';
import { Product, Price } from '~core/erm3';
import { ListHelper2Service } from '~core/list-page2';
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

	constructor(public listHelper: ListHelper2Service) {
		super();
	}

	updatePriceMOQ(product: Product, priceVal: Partial<Price>, type: 'price' | 'moq') {
		let price: Price;

		if (type === 'price') {
			const currency = priceVal && priceVal.currency ? priceVal.currency : 'USD';
			const value = priceVal && priceVal.value ? priceVal.value : undefined;

			price =  {
				...product.propertiesMap.price,
				value,
				currency
			};

			if (!value) {
				delete price.currency;
				delete price.value;
			}
		} else {
			const moq = priceVal && priceVal.minimumOrderQuantity ? priceVal.minimumOrderQuantity : undefined;

			price = {
				...product.propertiesMap.price,
				minimumOrderQuantity: moq
			};

			if (!moq) {
				delete price.minimumOrderQuantity;
			}
		}

		console.log('ProductsTableComponent -> updatePriceMOQ -> price', price);

		api.Product.update([{
			id: product.id,
			propertiesMap: {
				price
			}
		}]).subscribe();
	}
}

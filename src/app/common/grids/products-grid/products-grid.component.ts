import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { translate } from '~utils';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from '~core/list-page2';
import { Product } from 'showsourcing-api-lib';
import * as _ from 'lodash';

@Component({
	selector: 'products-grid-app',
	templateUrl: './products-grid.component.html',
	styleUrls: ['./products-grid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsGridComponent extends EntityTableComponent<Product> implements OnInit {
	@Input() rows: Product[];
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();

	grouppedProducts: Array<{string: Product}>;
	currentSortProperty: string;

	constructor(
		private sortSrv: SortService,
		private cdr: ChangeDetectorRef,
		public selectionSrv: SelectionService
	) {
		super();
	}

	getGroupedProducts() {
		this.currentSortProperty = this.sortSrv.currentSort.property;
		const fieldSortByTokens = this.currentSortProperty.split('.');
		const field = fieldSortByTokens[0];

		if (!this.rows) {
			return this.rows;
		}

		const groupedObj = {};

		const categories: any = {
			productsWithoutCategory: []
		};

		this.rows.forEach((product: Product) => {
			if (!product.category) {
				categories.productsWithoutCategory.push(product);
				return;
			}

			if ((typeof product.category === 'object') && product.category.value in categories) {
				categories[product.category.value].push(product);
			} else {
				const category = typeof product.category === 'object' ? product.category.value : product.category;
				categories[category] = [product];
			}
		});

		groupedObj[this.sortSrv.currentSort.property] = categories;

		this.grouppedProducts = groupedObj[this.currentSortProperty];

		const keys = _.keys(this.grouppedProducts);
		const indexOfNoCategory = keys.indexOf('productsWithoutCategory');

		const lastCategory = keys[keys.length - 1];
		keys[keys.length - 1] = keys[indexOfNoCategory];
		keys[indexOfNoCategory] = lastCategory;

		return keys;
	}
}

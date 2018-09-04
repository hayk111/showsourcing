import { Component, Input } from '@angular/core';
import { Product } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';
import { Sort } from '~shared/table/components/sort.interface';


@Component({
	selector: 'products-review-card-view-app',
	templateUrl: './products-review-card-view.component.html',
	styleUrls: ['./products-review-card-view.component.scss']
})
export class ProductsReviewCardViewComponent extends ListViewComponent<Product> {

	@Input() products: Product[];
	@Input() currentSort: Sort;

	isSelected(product) {
		if (this.selection)
			return this.selection.has(product.id);

		throw Error(`Selection Input is undefnied`);
	}

	getGroupedProducts(sort: Sort) {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (!this.rows) {
			return this.rows;
		}

		const groupedObj = this.rows.reduce((prev, cur) => {
      const id = (cur[field] && cur[field].id) ? cur[field].id : cur[field];
      // console.log('id = ', id);
			if (!prev[id]) {
				prev[id] = [cur];
			} else {
				prev[id].push(cur);
			}
			return prev;
		}, {});
		return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
	}

	getGroupedValue(group, sort: Sort) {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (group && group.value.length > 0) {
			return (group.value[0] && group.value[0][field]) ? group.value[0][field].name : null;
		}
		return null;
	}
}

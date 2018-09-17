import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ChangeDetectorRef,
} from '@angular/core';
import { Product, ProductStatusType } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';
import { Sort } from '~shared/table/components/sort.interface';


@Component({
	selector: 'products-card-view-app',
	templateUrl: './products-card-view.component.html',
	styleUrls: ['./products-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCardViewComponent extends ListViewComponent<Product> {
	@Input() currentSort: Sort;
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Product>();

	getGroupedProducts(sort: Sort) {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (!this.rows) {
			return this.rows;
		}

		const groupedObj = this.rows.reduce((prev, cur) => {
			const id = (cur[field] && cur[field].id) ? cur[field].id : cur[field];
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

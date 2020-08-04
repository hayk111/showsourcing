import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { translate } from '~utils';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from '~core/list-page2';
import { Product } from 'showsourcing-api-lib';

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
	constructor(private sortSrv: SortService, public selectionSrv: SelectionService) {
			super();
		}

	ngOnInit() {
		console.log('ProductsGridComponent -> ngOnInit -> this.rows', this.rows);
	}

	getGroupedProducts() {
		const fieldSortyBy = this.sortSrv.currentSort.property;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (!this.rows) {
			return this.rows;
		}

		let groupedObj = {};

		console.log('this.sortSrv.currentSort.property', this.sortSrv.currentSort.property);
		switch (this.sortSrv.currentSort.property) {
			case 'category.name':
			case 'supplier.name':
			case 'favorite':
				groupedObj = this.rows.reduce((prev, cur) => {
					const id = (cur[field] && cur[field].id) ? cur[field].id : cur[field];
					if (!prev[id]) {
						prev[id] = [cur];
					} else {
						prev[id].push(cur);
					}
					return prev;
				}, {});
				break;
			default:
				groupedObj = {};
				groupedObj[this.sortSrv.currentSort.property] = this.rows;
				break;
		}
		const val = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
		return val;
	}

	getGroupedValue(group) {
		const fieldSortyBy = this.sortSrv.currentSort.property;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];
		let value = null;
		if (group && group.value.length > 0) {
			if (group.value[0]) {
				switch (field) {
					case 'favorite':
						value = group.value[0][field] ? 'Favorite' : 'Not Favorite';
						value = translate(value);
						break;
					case 'category':
					case 'supplier':
						value = group.value[0][field] ? group.value[0][field].name : null;
						break;
					default:
						value = '';
						break;
				}
			}
		}
		return value;
	}
}

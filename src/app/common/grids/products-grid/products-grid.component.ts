import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { EntityTableComponent } from '~core/list-page/entity-table.component';
import { TemplateService } from '~core/template/services/template.service';
import { Product } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { translate } from '~utils';

@Component({
	selector: 'products-grid-app',
	templateUrl: './products-grid.component.html',
	styleUrls: ['./products-grid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsGridComponent extends EntityTableComponent<Product> implements OnInit {
	@Input() currentSort: Sort;
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Product>();
	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();
	constructor(private templateSrv: TemplateService, private listSrv: ListPageService<Product, ProductService>) { super(); }

	ngOnInit() {
		this._subscription = this.templateSrv.bottomReached$.subscribe(_ => this.listSrv.loadMore());
	}

	getGroupedProducts(sort: Sort) {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (!this.rows) {
			return this.rows;
		}

		let groupedObj = {};

		switch (sort.sortBy) {
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
				groupedObj[sort.sortBy] = this.rows;
				break;
		}
		return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
	}

	getGroupedValue(group, sort: Sort) {
		const fieldSortyBy = sort.sortBy;
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

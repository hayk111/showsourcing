import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Product } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { translate } from '~utils';
import { ProductService } from '~core/entity-services';
import { TemplateService } from '~core/template/services/template.service';
import { ListPageService } from '~core/list-page';

@Component({
	selector: 'products-card-view-app',
	templateUrl: './products-card-view.component.html',
	styleUrls: ['./products-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCardViewComponent extends ListViewComponent<Product> implements OnInit {
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

		let groupedObj;

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

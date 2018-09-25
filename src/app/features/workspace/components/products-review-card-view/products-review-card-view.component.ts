import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Product, ERM } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';
import { Sort } from '~shared/table/components/sort.interface';
import { SelectionService } from '~shared/list-page/selection.service';


interface Category {
	key: string;
	values: Product[];
	label: any;
	checked: boolean;
}

@Component({
	selector: 'products-review-card-view-app',
	templateUrl: './products-review-card-view.component.html',
	styleUrls: ['./products-review-card-view.component.scss']
})
export class ProductsReviewCardViewComponent extends ListViewComponent<Product> implements OnChanges {

	@Input() currentSort: Sort;
	@Output() sentToWorkflow = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<any>();

	groupedProducts: Category[];
	prodERM = ERM.PRODUCT;

	constructor(private selectionSrv: SelectionService) {
		super();
	}

	ngOnChanges(changes) {
		if (changes.rows && changes.rows.currentValue) {
			const rows = changes.rows.currentValue;
			this.groupedProducts = this.getGroupedProducts(this.currentSort);
		}

		if (changes.currentSort && changes.currentSort.currentValue) {
			const currentSort = changes.currentSort.currentValue;
			this.groupedProducts = this.getGroupedProducts(currentSort);
		}

		if (changes.selection && changes.selection.currentValue) {
			const currentSelection = changes.selection.currentValue;
			const previousSelection = changes.selection.previousValue;
			if (this.groupedProducts && (!previousSelection || currentSelection.size !== previousSelection.size)) {
				this.groupedProducts = this.groupedProducts.map(category => ({
					...category,
					checked: this.hasAllProductsSelected(category, currentSelection)
				}));
			}
		}
	}

	trackByFn(index, product) {
		return product.id;
	}

	hasAllProductsSelected(category, currentSelection) {
		let allSelected = true;
		category.values.forEach(value => {
			if (!currentSelection.has(value.id)) {
				allSelected = false;
			}
		});
		return allSelected;
	}

	isSelected(product) {
		if (this.selection)
			return this.selection.has(product.id);

		throw Error(`Selection Input is undefnied`);
	}

	getGroupedProducts(sort: Sort): Category[] {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (!this.rows) {
			return [];
		}

		const groupedObj = this.rows.reduce((prev, cur) => {
			const id = (cur[field] && cur[field].id) ? cur[field].id : cur[field];
			if (!prev[id]) {
				prev[id] = [{ ...cur }];
			} else {
				prev[id].push({ ...cur });
			}
			return prev;
		}, {});
		return Object.keys(groupedObj).map(key => ({
			key, values: groupedObj[key], label: this.getGroupedValue(groupedObj[key], sort),
			checked: false
		}));
	}

	getGroupedValue(values, sort: Sort) {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		const field = fieldSortByTokens[0];

		if (values && values.length > 0) {
			return (values[0] && values[0][field]) ? values[0][field] : null;
		}
		return null;
	}

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}

	onChecked(category: Category) {
		if (category && category.values) {
			this.selectionSrv.selectAll(category.values.map(value => ({ id: value.id })));
		}
	}

	onUnchecked(category: Category) {
		if (category && category.values) {
			category.values.forEach(value => {
				this.selectionSrv.unselectOne({ id: value.id });
			});
		}
	}

	closeContextualMenuIfOpened(archiveMenu, workActionMenu) {
		if (archiveMenu && archiveMenu.menuOpen) {
			archiveMenu.closeMenu();
		}
		if (workActionMenu && workActionMenu.menuOpen) {
			workActionMenu.closeMenu();
		}
	}

	onStatusUpdated(product, status) {
		if (status) {
			this.statusUpdated.emit({ product, status });
		}
	}

}

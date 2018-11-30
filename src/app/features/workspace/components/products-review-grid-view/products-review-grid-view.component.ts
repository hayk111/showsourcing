import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Category } from '~features/workspace/models';
import { ProductStatusTypeService } from '~entity-services';
import { ERM, Product, ProductStatusType } from '~models';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { SelectionService } from '~core/list-page/selection.service';
import { Sort } from '~shared/table/components/sort.interface';


@Component({
	selector: 'products-review-grid-view-app',
	templateUrl: './products-review-grid-view.component.html',
	styleUrls: ['./products-review-grid-view.component.scss']
})
export class ProductsReviewCardViewComponent extends ListViewComponent<Product> implements OnInit, OnChanges {

	@Input() currentSort: Sort;
	@Output() sendToWorkflow = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<any>();

	firstStatus$: Observable<ProductStatusType>;
	groupedProducts: Category[];
	prodERM = ERM.PRODUCT;
	noFieldChecked: boolean;
	trackByKey = (index, item) => item.key;

	constructor(
		private selectionSrv: SelectionService,
		private prodStatusSrv: ProductStatusTypeService
	) {
		super();
	}

	ngOnInit() {
		this.firstStatus$ = this.prodStatusSrv.queryAll('', { query: 'inWorkflow == true', sortBy: 'step' }).pipe(
			first(),
			map(status => status[0] ? status[0] : null) // we only need the first
		);
	}

	ngOnChanges(changes) {

		if (changes.rows && changes.rows.currentValue) {
			const rows = changes.rows.currentValue;
			// Grouping products per category
			this.groupedProducts = this.getGroupedProducts(this.currentSort);
			this.noFieldChecked = false;
		}

		if (changes.currentSort && changes.currentSort.currentValue) {
			const currentSort = changes.currentSort.currentValue;
			// Grouping products per category
			this.groupedProducts = this.getGroupedProducts(currentSort);
		}

		if (changes.selection && changes.selection.currentValue) {
			const currentSelection = changes.selection.currentValue;
			const previousSelection = changes.selection.previousValue;
			// Checking selection for categories
			if (this.groupedProducts && (!previousSelection || currentSelection.size !== previousSelection.size)) {
				this.groupedProducts = this.groupedProducts.map(category => ({
					...category,
					checked: this.hasAllProductsSelected(category, currentSelection)
				}));
			}
		}
	}

	/** Trackby function for ngFor */
	trackByFn(index, product) {
		return product.id;
	}

	/** Checks if the category has all products selected */
	hasAllProductsSelected(category, currentSelection) {
		let allSelected = true;
		category.values.forEach(value => {
			if (!currentSelection.has(value.id)) {
				allSelected = false;
			}
		});
		return allSelected;
	}

	/** Gathers products per category according to sort */
	getGroupedProducts(sort: Sort): Category[] {
		const field = this.getFieldFromSort(sort);

		if (!this.rows) {
			return [];
		}

		const groupedObj = this.rows.reduce((prev, cur) => {
			const id = (cur[field] && cur[field].id) ? cur[field].id : 'null-' + field;
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

	/** Gets the list of elements associated with the sort */
	getGroupedValue(values, sort: Sort) {
		const field = this.getFieldFromSort(sort);
		if (values && values.length > 0) {
			return (values[0] && values[0][field]) ? values[0][field] : null;
		}
		return null;
	}

	/** Get the field name the sort applies on */
	getFieldFromSort(sort: Sort) {
		const fieldSortyBy = sort.sortBy;
		const fieldSortByTokens = fieldSortyBy.split('.');
		return fieldSortByTokens[0];
	}

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}


	/**
	 * Manage the selection from category header. If checked, all attached elements must
	 * be checked.
	 */
	onChecked(category: Category) {
		if (category && category.values) {
			this.selectionSrv.selectAll(category.values.map(value => ({ id: value.id })));
		}
	}

	/**
	 * Manage the unselection from category header. If checked, all attached elements must
	 * be unchecked.
	 */
	onUnchecked(category: Category) {
		if (category && category.values) {
			category.values.forEach(value => {
				this.selectionSrv.unselectOne({ id: value.id });
			});
		}
	}
}

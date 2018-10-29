import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Category } from '~features/workspace/models';
import { ProductStatusTypeService } from '~global-services';
import { ERM, Product, ProductStatusType } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { Sort } from '~shared/table/components/sort.interface';


@Component({
	selector: 'products-review-card-view-app',
	templateUrl: './products-review-card-view.component.html',
	styleUrls: ['./products-review-card-view.component.scss']
})
export class ProductsReviewCardViewComponent extends ListViewComponent<Product> implements OnInit, OnChanges {

	@Input() currentSort: Sort;
	@Output() sentToWorkflow = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<any>();

	firstStatus$: Observable<ProductStatusType>;
	groupedProducts: Category[];
	noFieldProducts: Product[];
	prodERM = ERM.PRODUCT;
	noFieldChecked: boolean;

	constructor(
		private selectionSrv: SelectionService,
		private prodStatusSrv: ProductStatusTypeService
	) {
		super();
	}

	ngOnInit() {
		this.firstStatus$ = this.prodStatusSrv.queryOneByPredicate(`step == 0`).pipe(first());
	}

	ngOnChanges(changes) {

		// here we just update 1 map instead the getGrouped etc
		// we make a function that fills that map whether its a supplier
		// a category por user
		if (changes.rows && changes.rows.currentValue) {
			const rows = changes.rows.currentValue;
			// Grouping products per category
			this.groupedProducts = this.getGroupedProducts(this.currentSort);
			// Grouping products without category
			this.noFieldProducts = this.getNoFieldProducts(this.currentSort);
			this.noFieldChecked = false;
		}

		if (changes.currentSort && changes.currentSort.currentValue) {
			const currentSort = changes.currentSort.currentValue;
			// Grouping products per category
			this.groupedProducts = this.getGroupedProducts(currentSort);
			// Grouping products without category
			this.noFieldProducts = this.getNoFieldProducts(this.currentSort);
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
			// Checking selection for products without category
			if (this.noFieldProducts && (!previousSelection || currentSelection.size !== previousSelection.size)) {
				this.noFieldChecked = this.hasAllNoFieldProductsSelected(currentSelection);
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

	/** Checks if all elements without category are selected */
	hasAllNoFieldProductsSelected(currentSelection) {
		let allSelected = true;
		this.noFieldProducts.forEach(value => {
			if (!currentSelection.has(value.id)) {
				allSelected = false;
			}
		});
		return allSelected;
	}

	/** Checks if a product is selected */
	isSelected(product) {
		if (this.selection)
			return this.selection.has(product.id);

		throw Error(`Selection Input is undefnied`);
	}

	/** Gets products without category */
	getNoFieldProducts(sort: Sort): Product[] {
		const field = this.getFieldFromSort(sort);
		if (!this.rows) {
			return [];
		}
		return this.rows.filter(row => !row[field]);
	}

	/** Gathers products per category according to sort */
	getGroupedProducts(sort: Sort): Category[] {
		const field = this.getFieldFromSort(sort);

		if (!this.rows) {
			return [];
		}

		const groupedObj = this.rows.filter(row => row[field]).reduce((prev, cur) => {
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
	 * Manage the selection from header for elements without category. If checked, all attached
	 * elements must be checked.
	 */
	onNoFieldChecked() {
		if (this.noFieldProducts) {
			this.selectionSrv.selectAll(this.noFieldProducts.map(value => ({ id: value.id })));
		}
	}

	/**
	 * Manage the unselection from header for elements without category. If checked, all attached
	 * elements must be unchecked.
	 */
	onNoFieldUnchecked() {
		if (this.noFieldProducts) {
			this.noFieldProducts.forEach(value => {
				this.selectionSrv.unselectOne({ id: value.id });
			});
		}
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

	/** Close the contextual menu if the mouse goes outside a product card */
	closeContextualMenuIfOpened(archiveMenu, workActionMenu) {
		if (archiveMenu && archiveMenu.menuOpen) {
			archiveMenu.closeMenu();
		}
		if (workActionMenu && workActionMenu.menuOpen) {
			workActionMenu.closeMenu();
		}
	}

	/** Triggers a status update (from the workflow action component) */
	onStatusUpdated(product, status) {
		if (status) {
			this.statusUpdated.emit({ product, status });
		}
	}

}

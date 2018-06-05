import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { UserService } from '~features/user';
import { DialogName, DialogService } from '~shared/dialog';
import { Filter, FilterType, FilterService, FilterGroup } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { Product, ProductStatus } from '~models';
import { SelectionService, ProductService } from '~features/products/services';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [FilterService]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	/** currently loaded products */
	products$: Observable<Array<Product>>;
	/** non observable version of the above */
	products: Array<Product> = [];
	// productsState$: Observable<EntityState<Product>>;
	/** We need the statuses for selectors, if there aren't any productStatus selector in this page this should be removed */
	statuses$: Observable<Array<ProductStatus>>;
	/** Whether the product is pending */
	pending = false;
	/** when the suppliers are loaded for the first time */
	initialLoading = true;
	// keeps tracks of the current selection
	selection = new Map<string, boolean>();

	// This is seperate from normal selection in case we click on one item
	selectedProductForDialog: Array<string> = new Array();
	// current view
	view: 'list' | 'card' = 'card';
	// whether the filter dialog is visible
	filterPanelOpen: boolean;
	filters: Array<Filter>;

	page = 0;
	perPage = 30;

	constructor(
		private userSrv: UserService,
		private router: Router,
		private productSrv: ProductService,
		private selectionSrv: SelectionService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		this.pending = true;
		this.products$ = this.productSrv.selectProducts({ perPage: this.perPage }).pipe(
			tap(() => {
				if (this.initialLoading) {
					this.pending = false;
					this.initialLoading = false;
				}
			})
		);
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		console.log('loadMore');
		this.page++;
		this.pending = true;
		this.productSrv.loadProductsNextPage({ page: this.page, perPage: this.perPage }).subscribe(() => {
			this.pending = false;
		});
	}

	/** filters product based on filter group */
	filterProducts(filtergroup: FilterGroup) {
		this.pending = true;
		this.productSrv.filterProducts({ perPage: this.perPage, filtergroup }).subscribe(() => {
			this.pending = false;
		});
	}

	/** Selects a product */
	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	/** Unselects a product */
	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}

	/** Unselect all produces */
	unselectAll() {
		this.selection = new Map();
	}

	/** Patch a property of a product */
	patch(patch: Product) {
		this.productSrv.updateProduct(patch).subscribe();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		// A callback is sent in the payload. This is an anti pattern in redux but it makes things easy here.
		// Let's avoid doing that whenever possible though.
		const callback = () => {
			const products: Array<string> = new Array();
			this.selection.forEach((value, key) => {
				if (value) products.push(key);
			});
			// this.store.dispatch(productActions.delete(products));
			this.unselectAll();
		};
		const text = `Delete ${this.selection.size} Products ?`;
		this.dlgSrv.open(DialogName.CONFIRM, { text, callback });
	}

	/** Open details page of a product */
	goToDetails(entityId: string) {
		this.router.navigate(['/product', 'details', entityId, 'general']);
	}

	/** When a product heart is clicked to favorite it */
	onItemFavorited(entityId: string) {
		// we are just patching a property of the product, which is the rating property
		const patch: Product = { id: entityId, favorite: true };
		this.patch(patch);
	}

	/** When a product heart is clicked to unfavorite it */
	onItemUnfavorited(entityId: string) {
		const patch: Product = { id: entityId, favorite: false };
		this.patch(patch);
	}

	/** When an product is liked / disliked */
	onItemVoted({ id, value }: { id: string; value: 0 | 100 }) {
		// this.store.dispatch(productActions.vote(id, value));
	}

	/** when filter button is clicked at the top we open the panel */
	openFilterPanel() {
		this.filterPanelOpen = true;
	}

	/** When we need to close the filter panel */
	closeFilterPanel() {
		this.filterPanelOpen = false;
	}

	/** Whenever we switch from list to card view */
	onViewChange(v: 'list' | 'card') {
		this.view = v;
	}

	/** when the blue button 'ADD TO PROJECT' in a product card is clicked */
	onItemAddToProject(id: string) {
		this.dlgSrv.open(DialogName.ADD_TO_PROJECT, { selectedProducts: [id] });
	}

	openCreateDlg() {
		this.dlgSrv.open(DialogName.NEW_PRODUCT);
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog() {
		this.dlgSrv.open(DialogName.ADD_TO_PROJECT, { selectedProducts: this.selectionArray });
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog() {
		this.dlgSrv.open(DialogName.EXPORT, { selectedProducts: this.selectionArray });
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog() {
		this.dlgSrv.open(DialogName.REQUEST_FEEDBACK, { selectedProducts: this.selectionArray });
	}

	get selectionArray() {
		return Array.from(this.selection.keys());
	}

}

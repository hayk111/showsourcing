import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap, first, switchMap } from 'rxjs/operators';
import { UserService } from '~shared/global-services';
import { DialogName, DialogService } from '~shared/dialog';
import { Filter, FilterType, FilterService, FilterGroup } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { Product, ProductStatus, Project } from '~models';
import { SelectionService, ProductService, ProjectService } from '~features/products/services';

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
	view: 'list' | 'card' = 'list';
	// whether the filter dialog is visible
	filterPanelOpen: boolean;
	filters: Array<Filter>;
	currentSort: { sortBy: string, sortOrder: string };

	// preview panel
	previewOpen: boolean;
	previewProduct: Product;

	//

	page = 0;

	constructor(
		private userSrv: UserService,
		private router: Router,
		private productSrv: ProductService,
		private selectionSrv: SelectionService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService,
		private cdr: ChangeDetectorRef) {
		super();
	}

	/** Connects products for the page */
	ngOnInit() {
		this.pending = true;
		this.products$ = this.productSrv.selectProducts().pipe(
			tap(() => {
				if (this.initialLoading) {
					this.pending = false;
					this.initialLoading = false;
				}
			})
		);
	}

	/** Loads more products when we reach the bottom of the page */
	loadMore() {
		this.page++;
		this.pending = true;
		this.filterSrv.filterGroup$.pipe(
			first(),
			switchMap((filtergroup: FilterGroup) => {
				return this.productSrv.loadProductsNextPage({
					page: this.page, sort: this.currentSort, filtergroup
				});
			})
		).subscribe(() => {
			this.pending = false;
		});
	}

	/** Sorts products based on criteria */
	sortProducts({ sortWith, order }) {
		const sort = { sortBy: sortWith, sortOrder: order };
		this.currentSort = sort;
		this.filterSrv.filterGroup$.pipe(
			first()
		).subscribe((filtergroup: FilterGroup) => {
			this.productSrv.sortProducts({ sort, filtergroup });
		});
	}

	/** Filters products based on filter group */
	filterProducts(filtergroup: FilterGroup) {
		this.pending = true;
		this.productSrv.filterProducts({ filtergroup, sort: this.currentSort }).subscribe(() => {
			this.pending = false;
		});
	}

	openPreview(product: Product) {
		this.previewProduct = product;
		this.previewOpen = true;
	}

	closePreview() {
		this.previewOpen = false;
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
		console.log('>> unselectAll - this.selection = ', this.selection);
		// this.selection.clear();
		this.selection = new Map();
		console.log('  >> unselectAll - this.selection = ', this.selection);
	}

	/** Patch a property of a product */
	patch(patch: Product) {
		this.productSrv.updateProduct(patch).subscribe();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected(product: Product) {
		let selection = this.selection;
		if (product) {
			selection = new Map<string, boolean>();
			selection.set(product.id, true);
		}
		// A callback is sent in the payload. This is an anti pattern in redux but it makes things easy here.
		// Let's avoid doing that whenever possible though.
		const callback = () => {
			const products: Array<string> = new Array();
			selection.forEach((value, key) => {
				if (value) products.push(key);
			});
			this.productSrv.deleteProducts(products).subscribe(() => {
				this.unselectAll();
				this.cdr.detectChanges();
			});
		};
		const text = `Delete ${selection.size} Product${selection.size > 1 ? 's' : ''} ?`;
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
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.open(DialogName.ADD_TO_PROJECT, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.open(DialogName.EXPORT, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.open(DialogName.REQUEST_FEEDBACK, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	get selectionArray() {
		return Array.from(this.selection.keys());
	}

}

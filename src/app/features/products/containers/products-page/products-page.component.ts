import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, switchMap, tap, takeUntil } from 'rxjs/operators';
import { ProductFeatureService, SelectionService } from '~features/products/services';
import { Product, ProductStatus } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { Filter, FilterGroup, FilterService } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { SortEvent } from '~shared/table/components/sort-event.interface';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [FilterService, SelectionService]
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
	selected$: Observable<Map<string, boolean>>;

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

	private currentPage = 0;
	private page$ = new BehaviorSubject<number>(0);
	private sort$ = new BehaviorSubject<SortEvent>(undefined);
	private query$ = new BehaviorSubject<any>(undefined);

	constructor(
		private router: Router,
		private productSrv: ProductFeatureService,
		private selectionSrv: SelectionService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService) {
		super();
	}

	/** Connects products for the page */
	ngOnInit() {
		this.pending = true;
		this.products$ = this.productSrv.selectProductList(
			this.page$,
			this.query$,
			this.sort$
		).pipe(
			tap(() => this.onLoad())
		);
		this.page$.pipe(takeUntil(this._destroy$))
			.subscribe(p => this.currentPage = p);
		this.selected$ = this.selectionSrv.selection$;
	}

	private onLoad() {
		if (this.initialLoading) {
			this.pending = false;
			this.initialLoading = false;
		}
	}

	/** Loads more products when we reach the bottom of the page */
	loadMore() {
		this.page$.next(this.currentPage++);
	}

	/** Sorts products based on criteria */
	sortProducts(sort: SortEvent) {
		this.sort$.next(sort);
	}

	/** Filters products based on filter group */
	filterProducts(filtergroup: FilterGroup) {
		this.pending = true;
		// this.productSrv.filterProducts({ filtergroup, sort: this.currentSort }).subscribe(() => {
		// 	this.pending = false;
		// });
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
		this.selectionSrv.selectOne(entityId);
	}

	/** Unselects a product */
	onItemUnselected(entityId: string) {
		this.selectionSrv.unselectOne(entityId);
	}

	/** Select all products */
	selectAll(ids: string[]) {
		this.selectionSrv.selectAll(ids);
	}

	/** Unselect all produces */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	/** update a product */
	update(product: Product) {
		this.productSrv.updateProduct(product).subscribe();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const products = Array.from(this.selectionSrv.selection.keys());
		// callback for confirm dialog
		const callback = () => {
			this.productSrv.deleteProducts(products).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${products.length} Product${products.length > 1 ? 's' : ''} ?`;
		this.dlgSrv.open(DialogName.CONFIRM, { text, callback });
	}

	/** Open details page of a product */
	goToDetails(entityId: string) {
		this.router.navigate(['/product', 'details', entityId, 'general']);
	}

	/** When a product heart is clicked to favorite it */
	onItemFavorited(entityId: string) {
		const product: Product = { id: entityId, favorite: true };
		this.update(product);
	}

	/** When a product heart is clicked to unfavorite it */
	onItemUnfavorited(entityId: string) {
		const product: Product = { id: entityId, favorite: false };
		this.update(product);
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
		return Array.from(this.selectionSrv.selection.keys());
	}

}

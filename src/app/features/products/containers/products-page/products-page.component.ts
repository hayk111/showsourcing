import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '~app/features/user';
import {
	EntityState,
	ERM,
	Product,
	productActions,
	ProductStatus,
	Project,
	projectActions,
	selectEntityArray,
	selectProductsState,
	fromProductStatus,
	selectProjects,
	selectProjectsProductsCount,
	User,
} from '~entity';
import { Patch } from '~entity/utils';
import { DialogActions, DialogName } from '~shared/dialog';
import {
	Filter,
	FilterCategory,
	FilterClass,
	FilterEvent,
	FilterGroupName,
	FilterPanelAction,
	FilterPrice,
	FilterProjects,
	FilterRating,
	FilterStatus,
	FilterSupplier,
	FilterTags,
	selectFilterGroup,
	selectFilterPanelOpen,
} from '~shared/filters';
import { AutoUnsub } from '~utils';
import { Router } from '@angular/router';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	products$: Observable<Array<Product>>;
	productsState$: Observable<EntityState<Product>>;
	statuses$: Observable<Array<ProductStatus>>;
	projectState$: Observable<EntityState<Project>>;
	teamMembersState$: Observable<EntityState<User>>;
	pending$: Observable<boolean>;
	// whether the products are currently loading.
	productEntities: EntityState<Product>;
	repr = ERM.product;
	// keeps tracks of the current selection
	selection = new Map<string, boolean>();

	// This is seperate from normal selection in case we click on one item
	selectedProductForDialog: Array<string> = new Array();
	// current view
	view: 'list' | 'card' = 'card';
	// whether the filter dialog is visible
	filterPanelOpen$: Observable<boolean>;
	// we have to pass a filterGroupName to the filteredListPage
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	filters: Array<Filter>;
	// those are the filters we want in the page
	filterClasses: Array<FilterClass> = [
		FilterSupplier,
		FilterCategory,
		FilterEvent,
		FilterProjects,
		FilterTags,
		FilterStatus,
		FilterRating,
		FilterPrice,
	];


	constructor(private store: Store<any>, private userSrv: UserService, private router: Router) {
		super();
	}

	ngOnInit() {
		this.products$ = this.store.select(selectEntityArray(ERM.product));
		this.productsState$ = this.store.select(selectProductsState);
		this.productsState$.subscribe(state => (this.productEntities = state));
		this.statuses$ = this.store.select(fromProductStatus.selectArray);
		this.filterPanelOpen$ = this.store.select(selectFilterPanelOpen);
		const filters$ = this.store.select<any>(selectFilterGroup(this.filterGroupName));
		filters$.subscribe(filters => {
			this.loadProducts(filters);
		});

	}

	loadProducts(filters) {
		this.store.dispatch(productActions.load({ filters: filters, pagination: true, drop: 0 }));
	}

	loadMore() {
		this.store.dispatch(
			productActions.loadMore({
				filters: this.filters,
				pagination: true,
				drop: this.productEntities.ids.length,
			})
		);
	}

	patch(patch: Patch) {
		this.store.dispatch(productActions.patch(patch));
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}

	unselectAll() {
		this.selection = new Map();
	}

	deleteSelected() {
		const callback = () => {
			const products: Array<string> = new Array();
			this.selection.forEach((value, key) => {
				if (value) products.push(key);
			});
			this.store.dispatch(productActions.delete(products));
			this.unselectAll();
		};
		const text = `Delete ${this.selection.size} Products ?`;
		this.store.dispatch(DialogActions.open(DialogName.CONFIRM, { text, callback }));
	}

	onItemDeleted(entityId: string) {
		this.store.dispatch(productActions.delete([entityId]));
	}

	goToDetails(entityId: string) {
		this.router.navigate(['/product', 'details', entityId, 'general']);
	}

	onItemFavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(productActions.patch(patch));
	}

	onItemUnfavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(productActions.patch(patch));
	}

	onItemVoted({ id, value }: { id: string; value: 0 | 100 }) {
		this.store.dispatch(productActions.vote(id, value));
	}

	openFilterPanel() {
		this.store.dispatch(FilterPanelAction.open());
	}

	closeFilterPanel() {
		this.store.dispatch(FilterPanelAction.close());
	}

	onViewChange(v: 'list' | 'card') {
		this.view = v;
	}

	// onItemAddToProject(id: string) {
	// 	this.selectedProductForDialog = new Array();
	// 	this.selectedProductForDialog.push(id);
	// 	this.store.dispatch(DialogActions.open(this.addProductDialog));
	// }

	// ----------------------------------------------------------------------------
	// --------------------------- Add to project Dialog
	// ----------------------------------------------------------------------------
	// openAddToProjectDialog() {
	// 	this.selectedProductForDialog = new Array();
	// 	this.selection.forEach((value, key) => {
	// 		if (value) this.selectedProductForDialog.push(key);
	// 	});
	// 	this.store.dispatch(DialogActions.open(this.addProductDialog));
	// }

	// addToProjects(selectedProjects) {
	// 	this.store.dispatch(projectActions.addProducts(Object.keys(selectedProjects), this.selectedProductForDialog));
	// 	this.store.dispatch(DialogActions.close(this.addProductDialog));
	// }

	// // ----------------------------------------------------------------------------
	// // --------------------------- Export Dialog
	// // ----------------------------------------------------------------------------

	// openExportDialog() {
	// 	this.selectedProductForDialog = new Array();
	// 	this.selection.forEach((value, key) => {
	// 		if (value) this.selectedProductForDialog.push(key);
	// 	});
	// 	this.store.dispatch(DialogActions.open(this.exportDialog));
	// }

	export($event) { }

	// ----------------------------------------------------------------------------
	// --------------------------- Request feedback Dialog
	// ----------------------------------------------------------------------------
	// openRequestFeedbackDialog() {
	// 	this.selectedProductForDialog = new Array();
	// 	this.selection.forEach((value, key) => {
	// 		if (value) this.selectedProductForDialog.push(key);
	// 	});
	// 	this.store.dispatch(DialogActions.open(this.requestFeedbackDialog));
	// }

	// requestFeeback(selectedMembers) {
	// 	this.store.dispatch(
	// 		productActions.requestFeedback(this.selectedProductForDialog, Object.keys(selectedMembers))
	// 	);
	// 	this.store.dispatch(DialogActions.close(this.requestFeedbackDialog));
	// }
}

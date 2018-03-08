import { ProjectActions } from './../../../projects/store/actions/project.actions';
import { selectMyTeamMembers } from '~store/selectors/entities/team-members.selector';
import {
	selectMyTeamProjects,
	selectProjectsProductsCount,
} from './../../../projects/store/selectors/projects.selector';
import { Project } from '~projects/models/project.model';
import { DialogName, DialogActions } from '~shared/dialog';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EntityState, ERM, selectEntityArray } from '~entity';
import { Product } from '~products/models';
import { ProductActions, selectProductsState } from '~products/store';
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
import { TargetAction } from '~store/action/target/target.action';
import { VoteSlctnActions } from '~store/action/target/vote.action';
import { Vote } from '~store/model/entities/vote.model';
import { Patch } from '~store/utils';
import { UserService, User } from '~user';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	products$: Observable<Array<Product>>;
	productsState$: Observable<EntityState<Product>>;
	pending$: Observable<boolean>;
	// whether the products are currently loading.
	productEntities: EntityState<Product>;
	repr = ERM.product;
	// when an item is clicked current target is a representation of that item
	previewDialogOpen = false;
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

	public addProductDialog: DialogName = DialogName.ADDTOPROJECT;
	public exportDialog: DialogName = DialogName.EXPORT;
	public requestFeedbackDialog: DialogName = DialogName.REQUESTFEEDBACK;

	projects$: Observable<Array<Project>> = new Observable<Array<Project>>();
	productsCount$: Observable<number>;
	teamMembers$: Observable<Array<User>>;

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.products$ = this.store.select(selectEntityArray(ERM.product));
		this.productsState$ = this.store.select(selectProductsState);
		this.productsState$.subscribe(state => (this.productEntities = state));
		this.filterPanelOpen$ = this.store.select(selectFilterPanelOpen);
		const filters$ = this.store.select<any>(selectFilterGroup(this.filterGroupName));
		filters$.subscribe(filters => {
			this.loadProducts(filters);
		});

		this.projects$ = this.store.select(selectMyTeamProjects);
		this.productsCount$ = this.store.select<any>(selectProjectsProductsCount);
		this.teamMembers$ = this.store.select(selectMyTeamMembers);
		this.store.dispatch(ProjectActions.loadProductCount(ERM.projects));
	}

	loadProducts(filters) {
		this.store.dispatch(ProductActions.load({ filters: filters, pagination: true, drop: 0 }));
	}

	loadMore() {
		this.store.dispatch(
			ProductActions.loadMore({
				filters: this.filters,
				pagination: true,
				drop: this.productEntities.ids.length,
			})
		);
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

	public deleteSelected() {
		const products: Array<string> = new Array();
		this.selection.forEach((value, key) => {
			if (value) products.push(key);
		});
		this.store.dispatch(ProductActions.delete(products));
		this.unselectAll();
	}

	onItemDeleted(entityId: string) {
		this.store.dispatch(ProductActions.delete([entityId]));
	}

	onItemOpened(entityId: string) {
		this.previewDialogOpen = true;
		const target = { entityId, entityRepr: this.repr };
		this.store.dispatch(TargetAction.select(target));
	}

	onItemFavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(ProductActions.patch(patch));
	}

	onItemUnfavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(ProductActions.patch(patch));
	}

	onItemVoted({ id, value }: { id: string; value: 0 | 100 }) {
		this.store.dispatch(ProductActions.vote(id, value));
	}

	openFilterPanel() {
		this.store.dispatch(FilterPanelAction.open());
	}

	closeFilterPanel() {
		this.store.dispatch(FilterPanelAction.close());
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}

	onViewChange(v: 'list' | 'card') {
		this.view = v;
	}

	onItemAddToProject(id: string) {
		this.selectedProductForDialog = new Array();
		this.selectedProductForDialog.push(id);
		this.store.dispatch(DialogActions.open(this.addProductDialog));
	}

	// ----------------------------------------------------------------------------
	// --------------------------- Add to project Dialog
	// ----------------------------------------------------------------------------
	public openAddToProjectDialog() {
		this.selectedProductForDialog = new Array();
		this.selection.forEach((value, key) => {
			if (value) this.selectedProductForDialog.push(key);
		});
		this.store.dispatch(DialogActions.open(this.addProductDialog));
	}
	public addToProjects(selectedProjects) {
		this.store.dispatch(
			ProjectActions.addProducts(Object.keys(selectedProjects), this.selectedProductForDialog)
		);
		this.store.dispatch(DialogActions.close(this.addProductDialog));
		// this.actionSubject.subscribe(action => {
		// 	if (action.type === ProjectsActionTypes.ADD_PRODUCTS_SUCCESS) {
		// 		this.store.dispatch(DialogActions.close(this.addProductDialog));
		// 	}
		// });
	}

	// ----------------------------------------------------------------------------
	// --------------------------- Export Dialog
	// ----------------------------------------------------------------------------

	public openExportDialog() {
		this.selectedProductForDialog = new Array();
		this.selection.forEach((value, key) => {
			if (value) this.selectedProductForDialog.push(key);
		});
		this.store.dispatch(DialogActions.open(this.exportDialog));
	}
	public export($event) {}

	// ----------------------------------------------------------------------------
	// --------------------------- Request feedback Dialog
	// ----------------------------------------------------------------------------
	public openRequestFeedbackDialog() {
		this.selectedProductForDialog = new Array();
		this.selection.forEach((value, key) => {
			if (value) this.selectedProductForDialog.push(key);
		});
		this.store.dispatch(DialogActions.open(this.requestFeedbackDialog));
	}

	public requestFeeback(selectedMembers) {
		this.store.dispatch(
			ProductActions.requestFeedback(this.selectedProductForDialog, Object.keys(selectedMembers))
		);
		this.store.dispatch(DialogActions.close(this.requestFeedbackDialog));
	}
}

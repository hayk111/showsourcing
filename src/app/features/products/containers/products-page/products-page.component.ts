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
import { UserService } from '~user';
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

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.products$ = this.store.select(selectEntityArray(ERM.product));
		this.productsState$ = this.store.select(selectProductsState);
		this.productsState$.subscribe(state => (this.productEntities = state));
		this.filterPanelOpen$ = this.store.select(selectFilterPanelOpen);
		const filters$ = this.store.select<any>(
			selectFilterGroup(this.filterGroupName)
		);
		filters$.subscribe(filters => {
			this.loadProducts(filters);
		});
	}

	loadProducts(filters) {
		this.store.dispatch(
			ProductActions.load({ filters: filters, pagination: true, drop: 0 })
		);
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
		const products: Array<String> = new Array();
		this.selection.forEach((value, key) => {
			if (value) products.push(key);
		});
		this.store.dispatch(ProductActions.delete(products));
		this.unselectAll();
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

	onItemVoted({ id, value }: { id: string; value: number }) {
		const vote = new Vote(value, this.userSrv.userId);
		vote.productId = id;
		this.store.dispatch(VoteSlctnActions.add(vote));
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
}

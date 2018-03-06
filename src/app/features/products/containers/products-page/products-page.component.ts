import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { ERM, EntityState, Patch, selectEntityArray } from '~entity';
import { Product } from '~products/models';
import { ProductActions } from '~products/store/actions';
import {
	selectFilteredEntity,
	selectProducts,
	selectProductsState,
} from '~products/store/selectors';
import {
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
	selectFilterPanelOpen,
	Filter,
	selectFiltersByName,
	selectFilterGroup,
} from '~shared/filters';
import { TargetAction } from '~store/action/target/target.action';
import { VoteSlctnActions } from '~store/action/target/vote.action';
import { Vote } from '~store/model/entities/vote.model';
import { UserService } from '~user';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	products$: Observable<Array<Product>>;
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
		FilterStatus,
		FilterRating,
		FilterPrice,
	];

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.products$ = this.store.select(selectEntityArray(ERM.product));
		this.pending$ = this.store
			.select(selectProductsState)
			.pipe(map((p: EntityState<Product>) => p.pending));
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
			ProductActions.load({ filters: filters, pagination: false })
		);
	}

	loadMore() {
		this.store.dispatch(
			ProductActions.load({
				filters: this.filters,
				pagination: true,
				currentCount: this.productEntities.ids.length,
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

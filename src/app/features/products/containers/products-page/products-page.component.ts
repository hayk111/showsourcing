import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Product } from '~products/models';
import { ProductActionsFactory } from '~products/store/actions';
import { selectFilteredEntity, selectProducts } from '~products/store/selectors';
import { TargetAction } from '~store/action/target/target.action';
import { VoteSlctnActions } from '~store/action/target/vote.action';
import { Vote } from '~store/model/entities/vote.model';
import {
	FilterCategory,
	FilterClass,
	FilterEvent,
	FilterGroupName,
	FilterPrice,
	FilterProjects,
	FilterRating,
	FilterStatus,
	FilterSupplier,
	FilterTags,
} from '~store/model/misc/filter.model';
import { entityRepresentationMap, EntityState } from '~store/utils/entities.utils';
import { Patch } from '~store/utils/patch.interface';
import { UserService } from '~user';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	// we have to pass a filterGroupName to the filteredListPage
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	// those are the filters we want in the page
	filterClasses: Array<FilterClass> = [
		FilterSupplier,
		FilterCategory,
		FilterEvent,
		FilterTags,
		FilterProjects,
		FilterStatus,
		FilterRating,
		FilterPrice,
	];
	products$: Observable<Array<Product>>;
	pending$: Observable<boolean>;
	// whether the products are currently loading.
	productEntities: EntityState<Product>;
	repr = entityRepresentationMap.product;
	// when an item is clicked current target is a representation of that item
	previewDialogOpen = false;
	// keeps tracks of the current selection
	selections = new Map<string, boolean>();
	// current view
	view: 'list' | 'card' = 'list';

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.products$ = this.store.select(selectFilteredEntity(this.filterGroupName));
		this.pending$ = this.store.select(selectProducts).pipe(map((p: EntityState<Product>) => p.pending));
	}

	onItemSelected(entityId: string) {
		this.selections.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selections.delete(entityId);
	}

	unselectAll() {
		this.selections = new Map();
	}

	onItemOpened(entityId: string) {
		this.previewDialogOpen = true;
		const target = { entityId, entityRepr: this.repr };
		this.store.dispatch(TargetAction.select(target));
	}

	onItemFavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(ProductActionsFactory.patch(patch));
	}

	onItemUnfavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(ProductActionsFactory.patch(patch));
	}

	onItemVoted({ id, value }: { id: string; value: number }) {
		const vote = new Vote(value, this.userSrv.getUserId());
		vote.productId = id;
		this.store.dispatch(VoteSlctnActions.add(vote));
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}

	onViewChange(v: 'list' | 'card') {
		this.view = v;
	}
}

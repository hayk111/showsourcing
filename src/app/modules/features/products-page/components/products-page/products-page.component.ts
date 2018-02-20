import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilterGroup, selectFilteredEntity } from '../../../../store/selectors/misc/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ProductActions } from '../../../../store/action/entities/index';
import { Product } from '../../../../store/model/entities/product.model';
import { EntityState, EntityRepresentation, EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { selectProducts } from '../../../../store/selectors/entities/products.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { map } from 'rxjs/operators';
import { FilterGroupName, FilterClass, FilterSupplier, FilterCategory,
	FilterEvent, FilterTags, FilterProjects, FilterStatus, FilterRating, FilterPrice } from '../../../../store/model/misc/filter.model';
import { TargetAction } from '../../../../store/action/target/target.action';
import { selectViewSwitcher } from '../../../../store/selectors/ui/view-switcher.selector';
import { Patch } from '../../../../store/utils/patch.interface';
import { VoteSlctnActions } from '../../../../store/action/target/vote.action';
import { Vote } from '../../../../store/model/entities/vote.model';
import { UserService } from '../../../../shared/user/services/user.service';

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
		FilterPrice
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

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.products$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
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
		let patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(ProductActions.patch(patch))
	}

	onItemUnfavorited(entityId: string) {
		let patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(ProductActions.patch(patch))
	}

	onItemVoted({id, value} : { id: string, value: number }) {
		const vote = new Vote(value, this.userSrv.getUserId());
		vote.productId = id;
		this.store.dispatch(VoteSlctnActions.add(vote));
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}
}

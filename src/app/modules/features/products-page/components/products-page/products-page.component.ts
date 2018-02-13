import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilterGroup, selectFilteredEntity } from '../../../../store/selectors/misc/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { Product } from '../../../../store/model/entities/product.model';
import { EntityState, EntityRepresentation, EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { selectProducts } from '../../../../store/selectors/entities/products.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { map } from 'rxjs/operators';
import { FilterGroupName, FilterClass, FilterSupplier, FilterCategory,
	FilterEvent, FilterTags, FilterProjects, FilterStatus, FilterRating, FilterPrice } from '../../../../store/model/misc/filter.model';
import { SelectionAction } from '../../../../store/action/selection/selection.action';
import { selectViewSwitcher } from '../../../../store/selectors/ui/view-switcher.selector';

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
	view$: Observable<any>;
	products$: Observable<Array<Product>>;
	// whether the products are currently loading.
	productEntities: EntityState<Product>;
	repr = entityRepresentationMap.product;
	// when an item is clicked current target is a representation of that item
	previewDialogOpen = false;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		//  this.store.dispatch(ProductActions.load(this.filterGroupName));
		this.view$ = this.store.select(selectViewSwitcher);
		this.products$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
	}

	onItemSelected(entityId: string) {
		this.previewDialogOpen = true;
		const target = { entityId, entityRepr: this.repr };
		this.store.dispatch(SelectionAction.select(target));
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}
}

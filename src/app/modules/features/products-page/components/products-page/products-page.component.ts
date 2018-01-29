import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilterGroup } from '../../../../store/selectors/misc/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { Product } from '../../../../store/model/entities/product.model';
import { EntityState, EntityRepresentation, EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { selectProducts } from '../../../../store/selectors/entities/products.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { map } from 'rxjs/operators';
import { FilterGroupName, FilterClass, FilterSupplier, FilterCategory,
	FilterEvent, FilterTags, FilterProjects, FilterStatus, FilterRating, FilterPrice } from '../../../../store/model/misc/filter.model';
import { SelectionAction } from '../../../../store/action/selection/selection.action';

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
	// whether the products are currently loading.
	pending = true;

	productEntities: EntityState<Product>;
	repr = entityRepresentationMap.product;
	// when an item is clicked current target is a representation of that item
	previewDialogOpen = false;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		//  this.store.dispatch(ProductActions.load(this.filterGroupName));
		this.store.select(selectProducts).pipe(
			map(products => products.pending)
		).subscribe(pending => this.pending = pending);
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

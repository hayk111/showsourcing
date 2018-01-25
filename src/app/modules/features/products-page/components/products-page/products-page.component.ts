import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityState, EntityRepresentation, EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';

import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { map } from 'rxjs/operators';
import { FilterGroupName, FilterClass, FilterSupplier, FilterCategory, FilterEvent, FilterTags,
	FilterProjects, FilterStatus, FilterRating, FilterPrice } from '../../../../store/model/misc/filter.model';
import { Product } from '../../../../store/model/entities/product.model';
import { selectProducts } from '../../../../store/selectors/entities/products.selector';

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
	currentTarget: EntityTarget;
	previewDialogOpen = false;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectProducts).pipe(
			map(products => products.pending)
		).subscribe(pending => this.pending = pending);
	}

	onItemSelected(entityId: string) {
		this.currentTarget = { entityId, entityRepr: this.repr };
		this.previewDialogOpen = true;
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}
}

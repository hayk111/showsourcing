import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName } from '../../../../store/model/filter.model';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ProductActions } from '../../../../store/action/product.action';
import { Product } from '../../../../store/model/product.model';
import { EntityState, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { DialogName } from '../../../../store/model/dialog.model';
import { selectProducts } from '../../../../store/selectors/products.selector';
import { DialogActions } from '../../../../store/action/dialog.action';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	// we have to pass a filterGroupName to the filteredListPage
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	filterTargets: Array<EntityRepresentation> = [
		entityRepresentationMap.suppliers,
		entityRepresentationMap.categories,
		entityRepresentationMap.events,
		entityRepresentationMap.tags,
		entityRepresentationMap.projects,
		entityRepresentationMap.productStatus,
		entityRepresentationMap.prices,
		entityRepresentationMap.ratings,
		entityRepresentationMap.sortByProduct
	];
	// whether products are pending
	pending = true;
	productEntities: EntityState<Product>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.dispatch(ProductActions.load(this.filterGroupName));
		this.store.select(selectProducts)
			.takeUntil(this._destroy$)
			.subscribe(p => this.onItemsReceived(p));
	}

	onItemsReceived(items: EntityState<Product>) {
		this.productEntities = items;
		this.pending = items.pending;
	}

	onItemClicked(id: string) {
		// we use the store to open the dialog with the correct product
		// so we can open the dialog from somewhere else
		this.store.dispatch(DialogActions.open(DialogName.PRODUCT));
		this.store.dispatch(DialogActions.setMetadata(DialogName.PRODUCT, { id }));
	}
}

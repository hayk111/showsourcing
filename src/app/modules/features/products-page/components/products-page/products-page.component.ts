import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName, EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';
import { ProductActions } from '../../../../store/action/product.action';
import { Product } from '../../../../store/model/product.model';
import { EntityState } from '../../../../store/utils/entities.utils';
import { DialogName } from '../../../../store/model/dialog.model';
import { selectProducts } from '../../../../store/selectors/products.selector';
import { DialogActions } from '../../../../store/action/dialog.action';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [ TeamItemLoaderService ]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
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
	pending = true;
	productEntities: EntityState<Product>;
	selectedProduct;

	constructor(private teamItemLoader: TeamItemLoaderService, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.teamItemLoader.init('product', ProductActions, this.filterGroupName);
		this.store.select(selectProducts)
			.takeUntil(this._destroy$)
			.subscribe(p => this.onItemsReceived(p));
	}

	onItemsReceived(items: EntityState<Product>) {
		this.productEntities = items;
		this.pending = items.pending;
	}

	onItemClicked(id: string) {
		this.selectedProduct = this.productEntities.byId[id];
		this.store.dispatch(DialogActions.open(DialogName.PRODUCT));
		this.store.dispatch(DialogActions.setMetadata(DialogName.PRODUCT, { id }));
	}
}

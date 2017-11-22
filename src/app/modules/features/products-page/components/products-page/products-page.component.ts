import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProp } from '../../../../store/selectors/panel.selector';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName, FilterTarget, FilterGroup } from '../../../../store/model/filter.model';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';
import { ProductActions } from '../../../../store/action/product.action';
import { Product } from '../../../../store/model/product.model';
import { AsyncEntity } from '../../../../store/utils/async-entity.utils';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ TeamItemLoaderService ]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	filterTargets: Array<FilterTarget> = [];
	pending = true;
	products = [];

	constructor(private itemLoader: TeamItemLoaderService, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.itemLoader.init('product', ProductActions, this.filterGroupName);
		this.store.select('products')
			.takeUntil(this._destroy$)
			.subscribe(p => this.onItemsReceived(p));
		this.store.select(selectFilterGroup(this.filterGroupName))
			.takeUntil(this._destroy$)
			.subscribe((f: FilterGroup) => this.filterTargets = f.targets);
	}

	onItemsReceived(items: AsyncEntity<Product>) {
		this.products = items.data;
		this.pending = items.pending;
	}
}

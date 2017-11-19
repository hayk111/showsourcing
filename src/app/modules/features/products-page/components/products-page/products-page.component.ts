import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProp } from '../../../../store/selectors/panel.selector';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName } from '../../../../store/model/filter.model';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';
import { ProductActions } from '../../../../store/action/product.action';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ TeamItemLoaderService ]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	filters$: Observable<Array<Filter>>;
	pending = true;
	products$;
	products = [];

	constructor(private itemLoader: TeamItemLoaderService, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.itemLoader.init('product', ProductActions);
		this.products$ = this.store.select('products');
		this.products$.takeUntil(this._destroy$)
			.subscribe(p => this.onItemsReceived(p));
		this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}

	onItemsReceived(items) {
		this.products = items.data;
		this.pending = items.pending;
	}
}

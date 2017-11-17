import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductLoadersService } from '../../services/product-loaders.service';
import { Store } from '@ngrx/store';
import { selectProp } from '../../../../store/selectors/panel.selector';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName } from '../../../../store/model/filter.model';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ ProductLoadersService ]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	filters$: Observable<Array<Filter>>;
	
	products$;
	products = [];

	constructor(private productLoaderSrv: ProductLoadersService, private store: Store<any>) {
		super();
		this.products$ = this.productLoaderSrv.products$;
		this.products$.takeUntil(this._destroy$)
			.subscribe(p => this.products = p);
	}

	ngOnInit() {
		this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}
}

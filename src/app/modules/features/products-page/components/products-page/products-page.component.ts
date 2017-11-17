import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductLoadersService } from '../../services/product-loaders.service';
import { Store } from '@ngrx/store';
import { selectProp } from '../../../../store/selectors/panel.selector';
import { selectFilterGroup } from '../../../../store/selectors/filter.selectors';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName } from '../../../../store/model/filter.model';

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ ProductLoadersService ]
})
export class ProductsPageComponent implements OnInit {
	filterGroupName = FilterGroupName.PRODUCT_PAGE;
	filters$: Observable<Array<Filter>>;
	
	products$;

	constructor(private productLoaderSrv: ProductLoadersService, private store: Store<any>) {
		this.products$ = this.productLoaderSrv.products$;
	}

	ngOnInit() {
		this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}
}

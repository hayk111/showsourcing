import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductLoadersService } from '../../services/product-loaders.service';
import { Store } from '@ngrx/store';
import { selectProp } from '../../../../store/selectors/panel.selector';

@Component({
	selector: 'app-products-page',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ ProductLoadersService ]
})
export class ProductsPageComponent implements OnInit {
	products$;
	isFilterPanelOpen$;
	products: Array<any> = [];

	constructor(private productLoaderSrv: ProductLoadersService, private store: Store<any>) {
		this.products$ = this.productLoaderSrv.products$;
		this.products$.subscribe(p => this.products = p);
	}

	ngOnInit() {
		this.isFilterPanelOpen$ = this.store.select(selectProp('filtersPanel', 'open'));
	}

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/product.model';
import { selectSuppliers } from '../../../../store/selectors/suppliers.selector';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Input() productEntities: EntityState<Product>;
	@Output() itemClicked = new EventEmitter<string>();
	suppliers$;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.suppliers$ = this.store.select(selectSuppliers);
	}


}

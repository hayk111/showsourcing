import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/entities/product.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { Observable } from 'rxjs/Observable';
import { selectProductByStatus } from '../../../../store/selectors/entities/products.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Output() itemClicked = new EventEmitter<string>();
	productsByStatus$: Observable<Array<any>>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.productsByStatus$ = this.store.select(selectProductByStatus(this.filterGroupName));
	}

	changeStatus(event) {
		this.store.dispatch(ProductActions.patch(event.data, 'status', event.enteringBag));
	}

	getBorderColor(i: number) {
		switch (i) {
			case 0: return '#f5a623';
			case 1: return '#bd10e0';
			case 2: return '#04c4c9';
			case 3: return '#71e591';
			case 4: return '#f94259';
			default: return '#04c4c9';
		}
	}

	trackByFn(index, product) {
		return product.id;
	}
}

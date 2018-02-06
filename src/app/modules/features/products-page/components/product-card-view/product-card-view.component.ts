import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/entities/product.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { Observable } from 'rxjs/Observable';
import { selectProductByStatus } from '../../../../store/selectors/entities/products.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Patch } from '../../../../store/utils/patch.interface';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Output() productSelect = new EventEmitter<string>();
	productsByStatus$: Observable<Array<any>>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.productsByStatus$ = this.store.select(selectProductByStatus(this.filterGroupName));
	}

	changeStatus(event) {
		const patch = { propName: 'status', value: event.enteringBag, id: event.data };
		this.store.dispatch(ProductActions.patch(patch));
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

	selectProduct(id: string) {
		this.productSelect.emit(id);
	}

	trackByFn(index, product) {
		return product.id;
	}
}

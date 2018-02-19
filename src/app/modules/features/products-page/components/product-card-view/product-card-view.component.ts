import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/entities/product.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { Observable } from 'rxjs/Observable';
import { selectProductByStatus } from '../../../../store/selectors/entities/products.selector';
import { ProductActions } from '../../../../store/action/entities/index';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Patch } from '../../../../store/utils/patch.interface';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Output() productSelect = new EventEmitter<string>();
	@Input() products: Array<Product> = [];

	constructor() { }

	ngOnInit() {
	}

	selectProduct(id: string) {
		this.productSelect.emit(id);
	}

	trackByFn(index, product) {
		return product.id;
	}


}

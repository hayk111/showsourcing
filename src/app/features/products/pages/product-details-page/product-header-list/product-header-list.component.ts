import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';
import { User } from '~core/models';

@Component({
	selector: 'product-header-list-app',
	templateUrl: './product-header-list.component.html',
	styleUrls: ['./product-header-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHeaderListComponent implements OnInit {
	@Input() product: Product;
	@Output() delete = new EventEmitter<Product>();
	@Output() export = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() supplierRequest = new EventEmitter<Product>();
	productEntity = ERM.PRODUCT;

	constructor() { }

	ngOnInit() {
	}

	onFavorited() {
		this.update.emit({ id: this.product.id, favorite: true });
	}

	onUnfavorited() {
		this.update.emit({ id: this.product.id, favorite: false });
	}

	onUserChanged(user: User) {
		this.update.emit({ id: this.product.id, assignee: new User({ id: user.id }) });
	}

}

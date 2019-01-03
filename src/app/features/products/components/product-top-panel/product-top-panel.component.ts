import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';
import { User } from '~core/models';

@Component({
	selector: 'product-top-panel-app',
	templateUrl: './product-top-panel.component.html',
	styleUrls: ['./product-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTopPanelComponent implements OnInit {
	@Input() product: Product;
	@Output() delete = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();

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

import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';
import { User } from '~core/models';
import { Router } from '@angular/router';

@Component({
	selector: 'product-header-details-app',
	templateUrl: './product-header-details.component.html',
	styleUrls: ['./product-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHeaderDetailsComponent implements OnInit {
	@Input() product: Product;
	@Output() delete = new EventEmitter<Product>();
	@Output() export = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() supplierRequest = new EventEmitter<Product>();
	productEntity = ERM.PRODUCT;

	constructor(private router: Router) { }

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

	getHeaderNavUrl(nav: string): string {
		return this.router.url.substring(0, this.router.url.lastIndexOf('/') + 1) + nav;
	}

}

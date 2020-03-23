import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '~core/erm';
import { User } from '~core/erm';
import { ERM } from '~core/erm';
import { Product } from '~core/erm';

@Component({
	selector: 'product-header-details-app',
	templateUrl: './product-header-details.component.html',
	styleUrls: ['./product-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductHeaderDetailsComponent {
	@Input() product: Product;
	@Output() delete = new EventEmitter<Product>();
	@Output() export = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() supplierRequest = new EventEmitter<Product>();
	productEntity = ERM.PRODUCT;

	constructor(private productSrv: ProductService) { }

	onFavorited() {
		this.update.emit({ id: this.product.id, favorite: true });
	}

	onUnfavorited() {
		this.update.emit({ id: this.product.id, favorite: false });
	}

	onUserChanged(user: User) {
		this.update.emit({ id: this.product.id, assignee: new User({ id: user.id }) });
	}

	updateProductName(isCancel: boolean, value: any, prop: string) {
		if (!isCancel) {
			this.productSrv.update({ id: this.product.id, name: value });
		}
	}

}
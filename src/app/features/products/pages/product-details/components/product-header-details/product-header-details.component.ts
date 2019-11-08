import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '~core/models';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';
import { ProductFeatureService } from '~features/products/services';

@Component({
	selector: 'product-header-details-app',
	templateUrl: './product-header-details.component.html',
	styleUrls: ['./product-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHeaderDetailsComponent {
	@Input() product: Product;
	// because at the moment the request count isn't on the product
	@Input() requestCount: number;
	@Output() delete = new EventEmitter<Product>();
	@Output() export = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	@Output() archive = new EventEmitter<Product>();
	@Output() supplierRequest = new EventEmitter<Product>();
	productEntity = ERM.PRODUCT;

	constructor(private srv: ProductFeatureService) {}

	onFavorited() {
		this.update.emit({ id: this.product.id, favorite: true });
	}

	onUnfavorited() {
		this.update.emit({ id: this.product.id, favorite: false });
	}

	onUserChanged(user: User) {
		this.update.emit({ id: this.product.id, assignee: new User({ id: user.id }) });
	}

	hasBadge(type: string) {
		if (!this.product)
			return;

		switch (type) {
			case 'tasks': return this.product.tasksLinkedAssignedToMe.count > 0;
			case 'samples': return this.product.samplesLinkedAssignedToMe.count > 0;
			case 'requests': return this.requestCount > 0;
		}
	}

	updateProductName(isCancel: boolean, value: any, prop: string) {
		if (!isCancel) {
			this.srv.update({ id: this.product.id, name: value });
		}
	}

}

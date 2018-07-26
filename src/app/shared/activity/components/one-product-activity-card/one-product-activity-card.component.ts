import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';
import { Router } from '@angular/router';
import { DialogService } from '~shared/dialog';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog/component';

@Component({
	selector: 'one-product-activity-card-app',
	templateUrl: './one-product-activity-card.component.html',
	styleUrls: ['./one-product-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneProductActivityCardComponent implements OnInit {
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();

	constructor(private router: Router, private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	hasThreeImages() {
		return this.product.images && this.product.images[2];
	}

	onFavorite() {
		this.updateProduct({ id: this.product.id, favorite: true });
	}

	onUnfavorite() {
		this.updateProduct({ id: this.product.id, favorite: false });
	}

	onVote(votes) {
		this.updateProduct({ id: this.product.id, votes });
	}

	updateProduct(product: Product) {
		this.update.emit(product);
		// since optimistic ui isn't working yet, let's modify the product locally
		this.product = { ...this.product, ...product };
	}
	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.open(ProductAddToProjectDlgComponent);
	}

}

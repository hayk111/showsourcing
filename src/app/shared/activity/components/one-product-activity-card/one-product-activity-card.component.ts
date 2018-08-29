import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgModuleRef, ViewChild, ElementRef } from '@angular/core';
import { Product, ERM } from '~models';
import { Router } from '@angular/router';
import { DialogService } from '~shared/dialog';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog/component';
import { DEFAULT_IMG } from '~utils';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'one-product-activity-card-app',
	templateUrl: './one-product-activity-card.component.html',
	styleUrls: ['./one-product-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneProductActivityCardComponent implements OnInit {

	@ViewChild(InputDirective) input: InputDirective;
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();

	typeEntity = ERM.PRODUCT;

	constructor(
		private router: Router,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>
	) { }

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
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
	}

}

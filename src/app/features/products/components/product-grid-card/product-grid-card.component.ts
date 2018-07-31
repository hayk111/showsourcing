import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgModuleRef } from '@angular/core';
import { Product } from '~models';
import { AutoUnsub } from '~utils';
import { ProductFeatureService } from '~features/products/services';
import { DialogService } from '~shared/dialog';
import { Router } from '@angular/router';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog/component';

@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent extends AutoUnsub implements OnInit {

	@Input() product: Product;
	@Input() selected: boolean;
	@Input() favorite: boolean;
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productFavorite = new EventEmitter<null>();
	@Output() productUnfavorite = new EventEmitter<null>();
	@Output() addToProject = new EventEmitter<null>();

	showOptionsBar = false;

	constructor(
		private featureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private router: Router) {
		super();
	}

	ngOnInit() {
	}

	setShowOptionsBar(b: boolean) {
		this.showOptionsBar = b;
	}

	updateProduct(product: any) {
		this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
	}

	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
	}

}

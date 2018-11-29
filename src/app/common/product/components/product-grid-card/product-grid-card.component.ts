import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModuleRef, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { ProductAddToProjectDlgComponent } from '~common/dialog/component';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent extends AutoUnsub implements OnInit {

	@Input() product: Product;
	@Input() set selection(selection: Map<string, boolean>) {
		this.selected = selection.has(this.product.id);
	}
	@Input() hasActions = true;
	@Input() hasCheckbox = true;
	@Output() productSelect = new EventEmitter<null>();
	@Output() productUnselect = new EventEmitter<null>();
	@Output() productFavorite = new EventEmitter<null>();
	@Output() productUnfavorite = new EventEmitter<null>();
	@Output() addToProject = new EventEmitter<null>();
	@Output() liked = new EventEmitter<null>();
	@Output() disliked = new EventEmitter<null>();

	prodERM = ERM.PRODUCT;
	showOptionsBar = false;
	selected: boolean;

	constructor(
		private srv: ProductService,
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
		this.srv.update({ id: this.product.id, ...product }).subscribe();
	}

	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
	}

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAddToProjectDlgComponent } from '~common/modals/component';
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-grid-card-deprecated-app',
	templateUrl: './product-grid-card-deprecated.component.html',
	styleUrls: ['./product-grid-card-deprecated.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardDeprecatedComponent extends AutoUnsub implements OnInit {

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
		this.dlgSrv.open(ProductAddToProjectDlgComponent, { selectedProducts: [this.product] });
	}

}

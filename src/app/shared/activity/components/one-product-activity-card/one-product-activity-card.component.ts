import {
	Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter,
	NgModuleRef, ViewChild, ElementRef, Renderer2
} from '@angular/core';
import { Product, ERM, Comment } from '~models';
import { Router } from '@angular/router';
import { DialogService } from '~shared/dialog';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog/component';
import { DEFAULT_IMG, AutoUnsub } from '~utils';
import { InputDirective } from '~shared/inputs';
import { Observable } from 'rxjs';
import { GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '~global-services';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'one-product-activity-card-app',
	templateUrl: './one-product-activity-card.component.html',
	styleUrls: ['./one-product-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneProductActivityCardComponent extends AutoUnsub implements OnInit {

	@Output() createComment = new EventEmitter<any>();
	@Output() update = new EventEmitter<Product>();
	@Input() groupFeed: GetStreamGroup;
	product$: Observable<Product>;
	product: Product;
	// comment input
	commentCtrl = new FormControl('');

	typeEntity = ERM.PRODUCT;

	constructor(
		private router: Router,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private productSrv: ProductService) {
		super();
	}

	ngOnInit() {
		const group = this.groupFeed.group;
		// when an activity group starts with product_activity, what's following is the id
		if (group.startsWith('product_activity')) {
			const productId = group.replace('product_activity_', '');
			this.product$ = this.productSrv.queryOne(productId);
		}
		// when it starts with create_product, we can get the product id by looking at the first activity
		if (group.startsWith('create_product')) {
			this.product$ = this.productSrv.queryOne(this.groupFeed.activities[0].object);
		}
		this.product$.pipe(takeUntil(this._destroy$)).subscribe(product => this.product = product);
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

	onSubmit() {
		this.createComment.emit({ text: this.commentCtrl.value, product: this.product });
		this.commentCtrl.reset();
	}

}

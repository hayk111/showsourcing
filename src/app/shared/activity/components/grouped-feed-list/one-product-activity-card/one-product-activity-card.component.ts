import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	NgModuleRef,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '~global-services';
import { ERM, Product } from '~models';
import { GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';
import { ProductAddToProjectDlgComponent } from '~shared/custom-dialog/component';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { ThumbService } from '~shared/rating/services/thumbs.service';

@Component({
	selector: 'one-product-activity-card-app',
	templateUrl: './one-product-activity-card.component.html',
	styleUrls: ['./one-product-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneProductActivityCardComponent extends AutoUnsub implements OnInit {

	@Input() groupFeed: GetStreamGroup;
	@Input() title: string;
	@Output() createComment = new EventEmitter<any>();
	@Output() update = new EventEmitter<Product>();
	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();
	@ViewChild(InputDirective) inp: InputDirective;
	product$: Observable<Product>;
	product: Product;
	commentCtrl = new FormControl('');
	typeEntity = ERM.PRODUCT;

	constructor(
		private router: Router,
		private dlgSrv: DialogService,
		private module: NgModuleRef<any>,
		private productSrv: ProductService,
		private thumbSrv: ThumbService) {
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
		this.product$.pipe(
			takeUntil(this._destroy$)
		).subscribe(product => this.product = product);
	}

	onFavorite() {
		this.updateProduct({ id: this.product.id, favorite: true });
	}

	onUnfavorite() {
		this.updateProduct({ id: this.product.id, favorite: false });
	}

	updateProduct(product: Product) {
		this.update.emit(product);
	}

	onViewProduct() {
		this.router.navigate(['product', 'details', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.module, { selectedProducts: [this.product] });
	}

	onEnter(event) {
		event.preventDefault();
		this.onSubmit();
	}

	onSubmit() {
		this.createComment.emit({ text: this.commentCtrl.value, entity: this.product, typeEntity: this.typeEntity });
		this.commentCtrl.reset();
	}

	score() {
		return this.thumbSrv.computeScore(this.product);
	}

}

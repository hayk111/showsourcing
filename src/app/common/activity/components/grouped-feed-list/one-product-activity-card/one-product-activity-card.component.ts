import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ProductAddToProjectDlgComponent } from '~common/dialogs/selection-dialogs';
import { CommentService } from '~core/orm/services/comment/comment.service';
import { ProductService } from '~core/orm/services';
import { Comment, ERM, Product } from '~core/orm/models';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'one-product-activity-card-app',
	templateUrl: './one-product-activity-card.component.html',
	styleUrls: ['./one-product-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneProductActivityCardComponent extends AutoUnsub implements OnInit {

	@Input() groupFeed: GetStreamGroup;
	@Input() title: string;
	@Output() createComment = new EventEmitter<{ comment: any, entity: any, erm: any }>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();
	@ViewChild(InputDirective, { static: false }) inp: InputDirective;
	product$: Observable<Product>;
	product: Product;
	commentCtrl = new FormControl('');
	typeEntity = ERM.PRODUCT;

	constructor(
		private router: Router,
		private dlgSrv: DialogService,
		private productSrv: ProductService,
		private ratingSrv: RatingService,
		private commentSrv: CommentService) {
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
		).subscribe(product => {
			this.product = product;
			this.product.status.name = product.status.name.toLowerCase().replace(' ', '-');
		});
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
		this.router.navigate(['products', this.product.id]);
	}

	openAddToProject() {
		this.dlgSrv.open(ProductAddToProjectDlgComponent, { selectedProducts: [this.product] });
	}

	onEnter(event) {
		event.preventDefault();
		this.onSubmit();
	}

	onSubmit() {
		const comment = new Comment({ text: this.commentCtrl.value });
		this.commentSrv.create(comment).subscribe(_ =>
			this.createComment.emit({ comment, entity: this.product, erm: ERM.PRODUCT })
		);
		this.commentCtrl.reset();
	}

	score() {
		return this.ratingSrv.computeScore(this.product);
	}

}

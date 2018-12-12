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
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { GetStreamGroup } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { ProductAddToProjectDlgComponent } from '~common/modals/component';
import { DialogService } from '~shared/dialog/services';
import { InputDirective } from '~shared/inputs';
import { AutoUnsub } from '~utils';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { Comment } from '~models';

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
		private thumbSrv: ThumbService,
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
		const comment = new Comment({ text: this.commentCtrl.value });
		this.commentSrv.create(comment);
		this.createComment.emit({ comment, entity: this.product, erm: ERM.PRODUCT });
		this.commentCtrl.reset();
	}

	score() {
		return this.thumbSrv.computeScore(this.product);
	}

}

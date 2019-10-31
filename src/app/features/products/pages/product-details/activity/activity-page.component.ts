import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ListPageService } from '~core/list-page';
import { ProductFeatureService } from '~features/products/services';
import { Product, Comment } from '~models';
import { AutoUnsub } from '~utils';
import { CommentService } from '~core/entity-services';



@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	private product: Product;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductFeatureService,
		private commentSrv: CommentService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id)
		);
		this.product$ = id$.pipe(
			switchMap(id => this.productSrv.selectOne(id)),
			tap(product => this.product = product)
		);
	}

	sendComment(text: string) {
		const comment = new Comment({ text });
		const commentUser = { ...comment };
		const comments = [...(this.product.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.productSrv.update({ id: this.product.id, comments }))
		).subscribe();
	}


}

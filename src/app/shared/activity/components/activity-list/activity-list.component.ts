import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { GetStreamResult, ActivityService } from '~shared/activity/services/activity.service';
import { Product, Comment } from '~models';
import { Router } from '@angular/router';
import { ProductService } from '~global-services/product/product.service';
import { TemplateService } from '~shared/template/services/template.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { CommentService } from '~global-services/comment/comment.service';

@Component({
	selector: 'activity-list-app',
	templateUrl: './activity-list.component.html',
	styleUrls: ['./activity-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent extends AutoUnsub implements OnInit {
	@Input() feedName: string[];
	feeds$: Observable<GetStreamResult[]>;
	private page$ = new BehaviorSubject(0);
	private page: number;

	constructor(
		private productSrv: ProductService,
		private activitySrv: ActivityService,
		private router: Router,
		private templateSrv: TemplateService,
		private commentSrv: CommentService
	) {
		super();
	}

	ngOnInit() {
		// getting the feed
		this.feeds$ = this.activitySrv.getFeed({
			page$: this.page$,
			feedName: this.feedName
		});

		// when we reach the bottom of the ** PAGE ** then we load more.
		this.templateSrv.bottomReached$.subscribe(_ => this.loadMore());

		this.page$.pipe(
			takeUntil(this._destroy$)
		).subscribe(page => this.page = page);
	}

	loadMore() {
		this.page$.next(++this.page);
	}

	updateProduct(product: Product) {
		this.productSrv.update(product).subscribe();
	}

	goToProduct(id: string) {
		this.router.navigate(['product', 'details', id]);
	}

	createComment(items: any) {
		const newComment = new Comment({ text: items.text });
		this.commentSrv.create(newComment);
		this.updateProduct({ id: items.product.id, comments: [...items.product.comments, newComment] });
	}


}

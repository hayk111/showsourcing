import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ActivityService } from '~shared/activity/services/activity.service';
import { Product, Comment } from '~models';
import { Router } from '@angular/router';
import { ProductService } from '~global-services/product/product.service';
import { TemplateService } from '~shared/template/services/template.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { CommentService } from '~global-services/comment/comment.service';
import { GroupedActivityFeed } from '~shared/activity/interfaces/client-feed.interfaces';
import { GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';

@Component({
	selector: 'grouped-feed-list-app',
	templateUrl: './grouped-feed-list.component.html',
	styleUrls: ['./grouped-feed-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedFeedListComponent extends AutoUnsub implements OnInit {
	@Input() feedResult: GroupedActivityFeed;

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
		// when we reach the bottom of the ** PAGE ** then we load more.
		this.templateSrv.bottomReached$.subscribe(_ => this.loadMore());
	}

	loadMore() {
		this.feedResult.loadMore();
	}

	updateProduct(product: Product) {
		this.productSrv.update(product).subscribe();
	}

	goToProduct(id: string) {
		this.router.navigate(['product', 'details', id]);
	}

	createComment(items: any) {
		const newComment = new Comment({ text: items.text });
		this.commentSrv.create(newComment).pipe(
			switchMap(_ => this.productSrv.update({ id: items.product.id, comments: [...items.product.comments, newComment] }))
		).subscribe();
	}

	getGroupName(feed: GetStreamGroup) {
		const group = feed.group;
		const manyActivities = feed.activities.length > 1;

		if (group.startsWith('product_activity'))
			return 'product_activity';
		if (group.startsWith('supplier_activity'))
			return 'supplier_activity';
		if (group.startsWith('create_product'))
			return manyActivities ? 'product_many_created' : 'product_one_created';
		if (group.startsWith('create_supplier'))
			return manyActivities ? 'supplier_many_created' : 'supplier_one_created';
	}

}

/*
Using in :
- dashboard

*/

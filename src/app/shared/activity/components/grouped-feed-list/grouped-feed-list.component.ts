import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ActivityService } from '~shared/activity/services/activity.service';
import { Product, Comment, Supplier, ERM, EntityMetadata } from '~models';
import { Router } from '@angular/router';
import { ProductService } from '~global-services/product/product.service';
import { TemplateService } from '~shared/template/services/template.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { CommentService } from '~global-services/comment/comment.service';
import { GroupedActivityFeed } from '~shared/activity/interfaces/client-feed.interfaces';
import { GetStreamGroup } from '~shared/activity/interfaces/get-stream-feed.interfaces';
import { SupplierService } from '~global-services';
import { ERMService } from '~global-services/_global/erm.service';

@Component({
	selector: 'grouped-feed-list-app',
	templateUrl: './grouped-feed-list.component.html',
	styleUrls: ['./grouped-feed-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedFeedListComponent extends AutoUnsub implements OnInit {

	@Input() feedResult: GroupedActivityFeed;
	typeEntity: EntityMetadata;

	constructor(
		private ermSrv: ERMService,
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

	update(entity: any) {
		if (this.typeEntity === undefined) throw Error('type entity is null check the getGroupName function');
		this.ermSrv.getGlobalService(this.typeEntity).update(entity).subscribe();
	}

	createComment(items: any) {
		if (this.typeEntity === undefined) throw Error('type entity is null check the getGroupName function');
		const newComment = new Comment({ text: items.text });
		this.commentSrv.create(newComment).pipe(
			switchMap(_ =>
				this.ermSrv.getGlobalService(items.typeEntity).update(
					{ id: items.entity.id, comments: [...items.entity.comments, newComment] }
				)
			)
		).subscribe();
	}

	getGroupName(feed: GetStreamGroup) {
		const group = feed.group;
		const manyActivities = feed.activities.length > 1;

		if (group.startsWith('product_activity')) {
			this.typeEntity = ERM.PRODUCT;
			return 'product_activity';
		}
		if (group.startsWith('supplier_activity')) {
			this.typeEntity = ERM.SUPPLIER;
			return 'supplier_activity';
		}
		if (group.startsWith('create_product')) {
			this.typeEntity = ERM.PRODUCT;
			return manyActivities ? 'product_many_created' : 'product_one_created';
		}
		if (group.startsWith('create_supplier')) {
			this.typeEntity = ERM.SUPPLIER;
			return manyActivities ? 'supplier_many_created' : 'supplier_one_created';
		}
	}

}

/*
Using in :
- dashboard

*/

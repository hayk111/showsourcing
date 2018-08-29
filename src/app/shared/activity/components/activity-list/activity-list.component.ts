import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { GetStreamResult, ActivityService } from '~shared/activity/services/activity.service';
import { Product, Comment } from '~models';
import { Router } from '@angular/router';
import { ProductService } from '~global-services/product/product.service';
import { TemplateService } from '~shared/template/services/template.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { CommentService } from '~global-services/comment/comment.service';

@Component({
	selector: 'activity-list-app',
	templateUrl: './activity-list.component.html',
	styleUrls: ['./activity-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent extends AutoUnsub implements OnInit {
	@Input() feedResult: GetStreamResult[];

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
		// this.templateSrv.bottomReached$.subscribe(_ => this.loadMore());

		// this.page$.pipe(
		// 	takeUntil(this._destroy$)
		// ).subscribe(page => this.page = page);
	}

	loadMore() {
		// this.page$.next(++this.page);
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


}

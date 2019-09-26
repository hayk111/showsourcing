import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CommentService, RequestElementService, SampleService, TaskService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ProductFeatureService } from '~features/products/services';
import { Comment, ERM, Product } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { Counts } from './product-activity-nav/product-activity-nav.component';


@Component({
	selector: 'product-activity-app',
	templateUrl: './product-activity.component.html',
	styleUrls: ['./product-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ProductActivityComponent extends AutoUnsub implements OnInit {
	selectedTab = 'comment';
	product$: Observable<Product>;
	counts$: Observable<Counts>;
	typeEntity = ERM.PRODUCT;
	private product: Product;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductFeatureService,
		public listSrv: ListPageService<any, any>,
		private commentSrv: CommentService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		private requestElemSrv: RequestElementService,
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
		);
		this.product$ = id$.pipe(
			switchMap(id => this.productSrv.selectOne(id)),
			tap(product => this.product = product)
		);
		this.counts$ = this.product$.pipe(
			map(product => this.productSrv.getActivityCount(product) )
		);
		this.onTabChange(this.selectedTab);
	}

	onTabChange(tabName: string) {
		this.selectedTab = tabName;
		let entitySrv;
		let entityMetadata;
		let selectParams = new SelectParams();
		let initialFilters = [
			// TODO Backend: uncomment when archived is put
			// { type: FilterType.ARCHIVED, value: false },
			{ type: FilterType.DELETED, value: false }
		];

		switch (tabName) {
			case 'comment':
				entitySrv = this.commentSrv;
				entityMetadata = ERM.COMMENT;
				break;
			case 'task':
				entitySrv = this.taskSrv;
				entityMetadata = ERM.TASK;
				break;
			case 'request':
				entitySrv = this.requestElemSrv;
				entityMetadata = ERM.REQUEST_ELEMENT;
				initialFilters = [];
				selectParams = new SelectParams({ sortBy: 'reply.status' });
				break;
			case 'sample':
				entitySrv = this.sampleSrv;
				entityMetadata = ERM.SAMPLE;
				break;
		}

		this.listSrv.setup({
			entitySrv: entitySrv,
			searchedFields: ['name'],
			selectParams, initialFilters, entityMetadata,
			originComponentDestroy$: this._destroy$
		});
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

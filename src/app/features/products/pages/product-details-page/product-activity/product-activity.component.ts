import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, filter, startWith } from 'rxjs/operators';
import { CommentService, RequestElementService, SampleService, TaskService, UserService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ProductFeatureService } from '~features/products/services';
import { Comment, ERM, Product } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { Counts } from './product-activity-nav/product-activity-nav.component';
import { DialogService, CloseEventType, CloseEvent } from '~shared/dialog';
import { CreationSampleDlgComponent, CreationTaskDlgComponent } from '~common/modals';
import { SupplierRequestDialogComponent } from '~common/modals/custom/supplier-request-dialog/supplier-request-dialog.component';


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
	assigneeFilterType = FilterType.ASSIGNEE;
	product: Product;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductFeatureService,
		public listSrv: ListPageService<any, any>,
		private commentSrv: CommentService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		private requestElemSrv: RequestElementService,
		private userSrv: UserService,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {

		this.product = { id: (this.route.parent.params as any).id };
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
		);
		this.product$ = id$.pipe(
			switchMap(id => this.productSrv.selectOne(id)),
			tap(product => this.product = product),
		);
		this.counts$ = this.product$.pipe(
			map(product => this.productSrv.getActivityCount(product)),
			startWith({ comment: of(0), task: of(0), sample: of(0), request: of(0) })
		);
		this.onTabChange(this.selectedTab);
	}

	onTabChange(tabName: string) {
		this.selectedTab = tabName;
		let entitySrv;
		let entityMetadata;
		let selectParams = new SelectParams();
		let initialFilters = [];

		switch (tabName) {
			case 'comment':
				entitySrv = this.commentSrv;
				entityMetadata = ERM.COMMENT;
				break;
			case 'task':
				entitySrv = this.taskSrv;
				entityMetadata = ERM.TASK;
				initialFilters = [{ type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id }];
				selectParams = new SelectParams({
					query: `product.id == "${this.product.id}" && deleted == false`
				});
				break;
			case 'request':
				entitySrv = this.requestElemSrv;
				entityMetadata = ERM.REQUEST_ELEMENT;
				selectParams = new SelectParams({
					sortBy: 'reply.status',
					query: `targetedEntityType == "Product" && targetId == "${this.product.id}" && reply.status == "replied"`
				});
				break;
			case 'sample':
				entitySrv = this.sampleSrv;
				entityMetadata = ERM.SAMPLE;
				selectParams = new SelectParams({
					query: `product.id == "${this.product.id}" && deleted == false`
				});
				break;
		}

		this.listSrv.setup({
			entitySrv: entitySrv,
			searchedFields: ['name'],
			selectParams,
			entityMetadata,
			originComponentDestroy$: this._destroy$,
			initialFilters
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

	openCreateSample() {
		this.dlgSrv.open(CreationSampleDlgComponent, { product: this.product }).pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	openCreateTask() {

		this.dlgSrv.open(CreationTaskDlgComponent, { product: this.product }).pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	openCreateRequest() {
		this.dlgSrv.open(SupplierRequestDialogComponent, { products: [this.product] }).pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	toggleMyTasks(show: boolean) {
		const userId = this.userSrv.userSync.id;

		const filterAssignee = {
			type: FilterType.ASSIGNEE,
			value: userId
		};
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

}

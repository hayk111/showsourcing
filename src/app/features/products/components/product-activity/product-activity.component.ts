import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { AutoUnsub } from '~utils';
import { Counts } from './product-activity-nav/product-activity-nav.component';
import { ListPageService } from '~core/list-page';
import { FilterType } from '~shared/filters';
import { CommentService, TaskService, SampleService, RequestElementService } from '~core/entity-services';




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

	constructor(
		private route: ActivatedRoute,
		private featureSrv: ProductFeatureService,
		public listSrv: ListPageService<any, any>,
		private commentSrv: CommentService,
		private taskSrv: TaskService,
		private sampleSrv: SampleService,
		private requestElemSrv: RequestElementService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
		);
		const product$ = id$.pipe(switchMap(id => this.featureSrv.selectOne(id)));
		this.counts$ = product$.pipe(
			map(product => this.featureSrv.getActivityCount(product) )
		);
		this.onTabChange(this.selectedTab);
	}

	onTabChange(tabName: string) {
		this.selectedTab = tabName;
		let entitySrv;
		let entityMetadata;

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
				break;
			case 'sample':
				entitySrv = this.sampleSrv;
				entityMetadata = ERM.SAMPLE;
				break;
		}

		this.listSrv.setup({
			entitySrv: entitySrv,
			searchedFields: ['name'],
			// we use the deleted filter there so we can send the query to export all to the export dlg
			initialFilters: [
				// TODO Backend: uncomment when archived is put
				// { type: FilterType.ARCHIVED, value: false },
				{ type: FilterType.DELETED, value: false }],
			entityMetadata: entityMetadata,
			originComponentDestroy$: this._destroy$
		});
	}

}

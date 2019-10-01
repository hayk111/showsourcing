import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo';
import { ProductService, UserService, CommentService, TaskService, SampleService, RequestElementService } from '~entity-services';
import { Product } from '~core/models';
import { of } from 'rxjs';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected commentSrv: CommentService,
		protected taskSrv: TaskService,
		protected sampleSrv: SampleService,
		protected requestElemSrv: RequestElementService
	) {
		super(analyticsSrv, apolloState, userSrv);
	}

	getActivityCount(product: Product) {
		const comment = of(product.comments.length);
		const task = this.taskSrv.queryCount(`product.id == "${product.id}" && deleted == false && assignee.id == "${this.userSrv.userSync.id}"`);
		const sample = this.sampleSrv.queryCount(`product.id == "${product.id}" && deleted == false`);
		const request = this.requestElemSrv.queryCount(
			`targetedEntityType == "Product" && targetId == "${product.id}" && reply.status == "replied"`
		);
		return { comment, task, sample, request };
	}

}

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

}

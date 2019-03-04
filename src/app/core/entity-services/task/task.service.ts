import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { TaskQueries } from '~entity-services/task/task.queries';
import { UserService } from '~entity-services/user/user.service';
import { Task } from '~models';


@Injectable({
	providedIn: 'root'
})
export class TaskService extends GlobalWithAuditService<Task> {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService) {
		super(apolloState, TaskQueries, 'task', 'tasks', userSrv, analyticsSrv);
	}

}

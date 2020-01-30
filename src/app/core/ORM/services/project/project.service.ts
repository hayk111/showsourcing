import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ProjectQueries } from '~entity-services/project/project.queries';
import { UserService } from '~entity-services/user/user.service';
import { Project } from '~models';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalWithAuditService<Project> {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService) {
		super(apolloState, ProjectQueries, 'project', 'projects', userSrv, analyticsSrv);
	}

}


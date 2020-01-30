import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { ProjectQueries } from '~core/erm/services/project/project.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { Project } from '~core/erm/models';


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


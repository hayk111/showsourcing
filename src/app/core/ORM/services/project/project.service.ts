import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/orm/services/_global/global-with-audit.service';
import { ProjectQueries } from '~core/orm/services/project/project.queries';
import { UserService } from '~core/orm/services/user/user.service';
import { Project } from '~core/orm/models';


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


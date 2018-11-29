import { Injectable } from '@angular/core';
import { Project } from '~models';

import { GlobalService } from '~entity-services/_global/global.service';
import { ProjectQueries } from '~entity-services/project/project.queries';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalWithAuditService<Project> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ProjectQueries, 'project', 'projects', userSrv);
	}

}


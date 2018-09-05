import { Injectable } from '@angular/core';
import { Project } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ProjectQueries } from '~global-services/project/project.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalWithAuditService<Project> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apollo, apolloState, ProjectQueries, 'project', 'projects', userSrv);
	}

}


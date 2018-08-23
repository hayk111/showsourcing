import { Injectable } from '@angular/core';
import { Project } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ProjectQueries } from '~global-services/project/project.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalWithAuditService<Project> {

	constructor(apollo: Apollo protected userSrv: UserService) {
		super(wrapper, new ProjectQueries(), 'Project', userSrv);
	}

}


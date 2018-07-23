import { Injectable } from '@angular/core';
import { Project } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ProjectQueries } from '~global-services/project/project.queries';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalService<Project> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ProjectQueries(), 'Project');
	}

}


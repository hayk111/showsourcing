import { Injectable } from '@angular/core';
import { Project } from '~models';
import { ApolloWrapper } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProjectQueries } from './project.queries';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalService<Project> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ProjectQueries(), 'Project');
	}

}


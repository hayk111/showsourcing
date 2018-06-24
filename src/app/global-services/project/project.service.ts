import { Injectable } from '@angular/core';
import { Project } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProjectQueries } from './Project.queries';


@Injectable({
	providedIn: 'root'
})
export class ProjectService extends GlobalService<Project> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ProjectQueries(), 'Project');
	}

}


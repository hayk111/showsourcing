import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Project } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';

import { ProjectQueries } from './Project.queries';


@Injectable({
	providedIn: 'root'
})
export class ProjectService implements GlobalServiceInterface<Project> {
	queries = new ProjectQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Project> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<Project[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.projects)
		);
	}

	update(status: Project): Observable<Project> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'Project'
		}).pipe(
			first(),
			map(({ data }) => data.updateProject)
		);
	}

	create(status: Project): Observable<Project> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: 'Project'
		}).pipe(
			first(),
			map(({ data }) => data.createProject)
		);
	}

	delete(project: Project): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(project: Project[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

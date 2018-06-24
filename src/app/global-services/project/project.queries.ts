import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ProjectQueries implements GlobalQuery {

	one: any = gql`
	subscription project($query: String!) {
		projects(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createProject($input: ProjectInput!) {
			updateProject(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateProject($input: ProjectInput!) {
			updateProject(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteProject($id: String!) {
			deleteProject(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteProjects($query: String!) {
			deleteProjects(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription projects {
			projects {
				${str}
			}
		}
	`;

}

import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
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

	delete = gql`
		mutation deleteProject($input: String!) {
			deleteProject(id: $input)
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

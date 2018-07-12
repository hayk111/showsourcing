import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ProjectQueries implements GlobalQuery {

	one: any = gql`
	subscription project($query: String!) {
		projects(query: $query) {
			id, name, description, lastUpdatedDate, creationDate, createdBy { id, firstName, lastName }, logoImage { id, fileName }
		}
	}
	`;

	list: any = gql`
		subscription projects(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean) {
			projects(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending){
			  id, name, createdBy { id, firstName, lastName }, productCount, lastUpdatedDate, creationDate, description
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
	`
}

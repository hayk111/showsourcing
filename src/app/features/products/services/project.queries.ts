import gql from 'graphql-tag';

export class ProjectQueries {
	static list = gql`
		query projects {
			projects {
				id,
				name,
				products {
					id
				}
			}
		}`;

	static listForProduct = gql`
		subscription projects($query: String!) {
			projects (query: $query) {
				id,
				name,
				products {
					id
				}
			}
		}
	`;

	static updateProject = gql`
		mutation updateProject($input: ProjectInput!) {
			updateProject(input: $input) {
				id
			}
		}
	`;
}

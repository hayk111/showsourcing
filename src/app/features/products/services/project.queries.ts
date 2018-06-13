import gql from 'graphql-tag';

export class ProjectQueries {
	static list = gql`
		query projects {
			projects {
				id,
				name,
				productCount,
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
				productCount,
				# we are asking for products since we are gonna update those
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

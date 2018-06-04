import gql from 'graphql-tag';

export class FilterDataQueries {
	static suppliers = gql`
		subscription suppliers {
			suppliers {
				id,
				name,
				favorite
			}
		}`;

	// event
	static events = gql`
		subscription events {
			events(take: 30) {
				id,
				name,
				favorite
			}
		}`;

	// category
	static categories = gql`
		subscription categories {
			categories {
				id,
				name,
				favorite
			}
		}`;

	// tag
	static tags = gql`
		subscription tags {
			tags {
				id,
				name,
				favorite
			}
		}`;

	// project
	static projects = gql`
		subscription projects {
			projects {
				id,
				name,
				favorite
			}
		}`;

	// created by
	static createdBy = gql`
		subscription users {
			users {
				id,
				firstName,
				lastName
			}
		}`;

	// status
	static statuses = gql`
    subscription productStatuses {
			productStatuses {
					id,
					name,
					favorite
			}
		}`;

	// favorite
}

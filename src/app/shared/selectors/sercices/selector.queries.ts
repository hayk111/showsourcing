import gql from "graphql-tag";

export class SelectorQueries {
	static suppliers = gql`
		subscription suppliers {
			suppliers {
				id,
				name
			}
		}
	`;

	static categories = gql`
		subscription categories {
			categories {
				id,
				name
			}
		}
	`;

	static events = gql`
		subscription events {
			events {
				id,
				name
			}
		}
	`;

	static tags = gql`
		subscription tags {
			tags {
				id,
				name
			}
		}
	`;
}
import gql from "graphql-tag";

export class SelectorQueries {
	static suppliers = gql`
		query suppliers {
			suppliers {
				id,
				name
			}
		}
	`;

	static categories = gql`
		query categories {
			categories {
				id,
				name
			}
		}
	`;

	static events = gql`
		query events {
			events {
				id,
				name
			}
		}
	`;
}
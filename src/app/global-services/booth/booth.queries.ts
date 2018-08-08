import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class BoothQueries implements GlobalQuery {

	one: any = gql`
	subscription booth($query: String!) {
		booths(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createBooth($input: BoothInput!) {
			updateBooth(input: $input) {
				id, name
			}
		}
	`;

	many = gql`
	subscription booths(
		$take: Int,
		$skip: Int,
		$query: String!,
		$sortBy: String,
		$descending: Boolean
		) {
		booths(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
		id,
		name,
			createdBy {
				id,
				firstName,
				lastName
			}
		}
	}
`;

	update = gql`
		mutation updateBooth($input: BoothInput!) {
			updateBooth(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteBooth($id: String!) {
			deleteBooth(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteBooths($query: String!) {
			deleteBooths(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription booths {
			booths {
				${str}
			}
		}
	`
}

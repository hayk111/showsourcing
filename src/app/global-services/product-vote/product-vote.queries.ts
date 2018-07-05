import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ProductVoteQueries implements GlobalQuery {

	one: any = gql`
	subscription productVote($query: String!) {
		productVotes(query: $query) {
			id,
			value,
			user {
				id
			}
		}
	}
	`;

	create = gql`
		mutation createProductVote($input: ProductVoteInput!) {
			updateProductVote(input: $input) {
				id, value
			}
		}
	`;

	update = gql`
		mutation updateProductVote($input: ProductInput!) {
			updateProductVote(input: $input) {
				id, value
			}
		}
	`;

	deleteOne = gql`
		mutation deleteProductVote($id: String!) {
			deleteProductVote(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteProductVotes($query: String!) {
			deleteProductVotes(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription productVotes {
			productVotes {
				${str}
			}
		}
	`

}

import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ProductVoteRequestQueries implements GlobalQuery {
	one = gql`
	subscription productVoteRequests($query: String!) {
		productVoteRequests(query: $query) {
			id
		}
	}
	`;
	create = gql`
	mutation createProductVoteRequest($input: ProductVoteRequestInput) {
		updateProductVoteRequest(input: $input) {
			id
		}
	}
	`;

	update = gql`
	mutation updateProductVoteRequest($input: ProductVoteRequestInput) {
		updateProductVoteRequest(input: $input) {
			id
		}
	}`;

	deleteOne = gql`
	mutation deleteProductVoteRequest($id: String!) {
		deleteProductVoteRequest(id: $id)
	}
	`;

	deleteMany = gql`
	mutation deleteProductVoteRequest($query: String!) {
		deleteProductVoteRequests(query: $query)
	}
	`;

	list = gql`
		subscription productVoteRequests($query: String!) {
			productVoteRequests(query: $query) {
				id
			}
		}
	`;

	all = (str: string) => {
		return gql`
			subscription productVoteRequests {
				productVoteRequests{
					${str}
				}
			}
		`;
	}
}

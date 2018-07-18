import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ExportRequestQueries implements GlobalQuery {
	one = gql`
	subscription exportRequests($query: String!) {
		exportRequests(query: $query) {
			id
		}
	}
	`;
	create = gql`
	mutation createExportRequest($input: ExportRequestInput) {
		updateExportRequest(input: $input) {
			id
		}
	}
	`;

	update = gql`
	mutation updateExportRequest($input: ExportRequestInput) {
		updateExportRequest(input: $input) {
			id
		}
	}`;

	deleteOne = gql`
	mutation deleteExportRequest($id: String!) {
		deleteExportRequest(id: $id)
	}
	`;

	deleteMany = gql`
	mutation deleteExportRequest($query: String!) {
		deleteExportRequests(query: $query)
	}
	`;

	list = gql`
		subscription exportRequests($query: String!) {
			exportRequests(query: $query) {
				id
			}
		}
	`;

	all = (str: string) => {
		return gql`
			subscription exportRequests {
				exportRequests{
					${str}
				}
			}
		`;
	}
}

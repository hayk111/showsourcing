import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class FileUploadRequestQueries implements GlobalQuery {
	one = gql`
	subscription fileUploadRequests($query: String!) {
		fileUploadRequests(query: $query) {
			id,
			status,
			uploadUrl,
			formData
		}
	}
	`;
	create = gql`
	mutation createFileUploadRequest($input: FileUploadRequestInput) {
		updateFileUploadRequest(input: $input) {
			id,
			status,
			uploadUrl,
			formData
		}
	}
	`;

	update = gql`
	mutation updateFileUploadRequest($input: FileUploadRequestInput) {
		updateFileUploadRequest(input: $input) {
			id
		}
	}`;

	deleteOne = gql`
	mutation deleteFileUploadRequest($id: String!) {
		deleteFileUploadRequest(id: $id)
	}
	`;

	deleteMany = gql`
	mutation deleteFileUploadRequest($query: String!) {
		deleteFileUploadRequests(query: $query)
	}
	`;

	list = gql`
		subscription fileUploadRequests($query: String!) {
			fileUploadRequests(query: $query) {
				id,
				status,
				uploadUrl,
				formData
			}
		}
	`;

	all = (str: string) => {
		return gql`
			subscription fileUploadRequests {
				fileUploadRequests{
					${str}
				}
			}
		`;
	}
}

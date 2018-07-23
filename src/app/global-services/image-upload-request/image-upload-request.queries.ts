import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class ImageUploadRequestQueries implements GlobalQuery {
	one = gql`
	subscription imageUploadRequests($query: String!) {
		imageUploadRequests(query: $query) {
			id,
			status,
			uploadUrl,
			formData
		}
	}
	`;
	create = gql`
	mutation createImageUploadRequest($input: ImageUploadRequestInput) {
		updateImageUploadRequest(input: $input) {
			id,
			status,
			uploadUrl,
			formData
		}
	}
	`;

	update = gql`
	mutation updateImageUploadRequest($input: ImageUploadRequestInput) {
		updateImageUploadRequest(input: $input) {
			id
		}
	}`;

	deleteOne = gql`
	mutation deleteImageUploadRequest($id: String!) {
		deleteImageUploadRequest(id: $id)
	}
	`;

	deleteMany = gql`
	mutation deleteImageUploadRequest($query: String!) {
		deleteImageUploadRequests(query: $query)
	}
	`;

	list = gql`
		subscription imageUploadRequests($query: String!) {
			imageUploadRequests(query: $query) {
				id,
				status,
				uploadUrl,
				formData
			}
		}
	`;

	all = (str: string) => {
		return gql`
			subscription imageUploadRequests {
				imageUploadRequests{
					${str}
				}
			}
		`;
	}
}

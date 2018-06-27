import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class ImageQueries implements GlobalQuery {

	one: any = gql`
	subscription image($query: String!) {
		images(query: $query) {
			id, name
		}
	}
	`;

	list: any = gql`
		subscription images(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean) {
			images(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending){
			  id, name
			}
		}
	`;

	create = gql`
		mutation createImage($input: ImageInput!) {
			updateImage(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateImage($input: ImageInput!) {
			updateImage(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteImage($id: String!) {
			deleteImage(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteImages($query: String!) {
			deleteImages(query: $query)
		}
	`;



	all = (str: string) => gql`
		subscription images {
			images {
				${str}
			}
		}
	`
}

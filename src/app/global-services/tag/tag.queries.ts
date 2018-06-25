import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class TagQueries implements GlobalQuery {

	one: any = gql`
	subscription tag($query: String!) {
		tags(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createTag($input: TagInput!) {
			updateTag(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateTag($input: TagInput!) {
			updateTag(input: $input) {
				id, name
			}
		}
	`;

	deleteOne = gql`
		mutation deleteTag($id: String!) {
			deleteTag(id: $id)
		}
	`;

	deleteMany = gql`
		mutation deleteTags($query: String!) {
			deleteTags(query: $query)
		}
	`;

	all = (str: string) => gql`
		subscription tags {
			tags {
				${str}
			}
		}
	`;

}
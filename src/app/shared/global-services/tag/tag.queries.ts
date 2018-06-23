import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
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

	delete = gql`
		mutation deleteTag($input: String!) {
			deleteTag(id: $input)
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

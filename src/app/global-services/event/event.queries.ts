import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class EventQueries implements GlobalQuery {

	one: any = gql`
	subscription event($query: String!) {
		events(query: $query) {
			id, name
		}
	}
	`;

	many = gql`
	subscription events(
		$take: Int,
		$skip: Int,
		$query: String!,
		$sortBy: String,
		$descending: Boolean
		) {
		events(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
			id,
			name,
			description {
				id,
				name,
				startDate,
				endDate,
			}
		}
	}
`;

	create = gql`
		mutation createEvent($input: EventInput!) {
			updateEvent(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation updateEvent($input: EventInput!) {
			updateEvent(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation deleteEvent($id: String!) {
			deleteEvent(id: $id)
		}
	`;

	deleteMany = gql`
	mutation deleteEvent($query: String!) {
		deleteEvents(query: $query)
	}
	`;

	all = (str: string) => gql`
		subscription events {
			events {
				${str}
			}
		}
	`

}

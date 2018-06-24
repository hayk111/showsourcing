import { GlobalQuery } from '../_global/global.query.interface';
import gql from 'graphql-tag';

export class EventQueries implements GlobalQuery {

	one: any = gql`
	subscription event($query: String!) {
		events(query: $query) {
			id, name
		}
	}
	`;

	create = gql`
		mutation createEvent($input: EventInput!) {
			updateEvent(input: $input) {
				id, name
			}
		}
	`;

	update = gql`
		mutation updateEvent($input: EventInput!) {
			updateEvent(input: $input) {
				id, name
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
	`;

}

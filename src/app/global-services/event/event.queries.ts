import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';
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

	delete = gql`
		mutation deleteEvent($input: String!) {
			deleteEvent(id: $input)
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

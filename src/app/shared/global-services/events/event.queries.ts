import gql from 'graphql-tag';
import { GlobalQuery } from '~shared/global-services/_interfaces/global.query.interface';

export class EventQueries implements GlobalQuery {

	create = gql`
		mutation addEvent($input: EventInput!) {
			addEvent(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation event($input: EventInput!) {
			updateEvent(input: $input) {
				id
			}
		}
	`;

	delete = gql`
		mutation event($input: String!) {
			deleteEvent(id: $input)
		}
	`;

	all = (fields: string) => {
		return gql`
			subscription events {
				events {
					${fields}
				}
			}`;
	}
}

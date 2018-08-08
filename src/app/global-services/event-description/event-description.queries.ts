import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';

export class EventDescriptionQueries implements GlobalQuery {
	one = gql`
	subscription eventDescriptions($query: String!) {
		eventDescriptions(query: $query) {
			id,
			name
		}
	}
	`;
	create = gql`
	mutation createEventDescription($input: EventDescriptionInput) {
		updateEventDescription(input: $input) {
			id
		}
	}
	`;

	update = gql`
	mutation updateEventDescription($input: EventDescriptionInput) {
		updateEventDescription(input: $input) {
			id
		}
	}`;

	deleteOne = gql`
	mutation deleteEventDescription($id: String!) {
		deleteEventDescription(id: $id)
	}
	`;

	deleteMany = gql`
	mutation deleteEventDescription($query: String!) {
		deleteEventDescriptions(query: $query)
	}
	`;

	many = gql`
		subscription eventDescriptions($query: String!) {
			eventDescriptions(query: $query) {
				id,
				name
			}
		}
	`;

	all = (str: string) => {
		return gql`
			subscription eventDescriptions {
				eventDescriptions{
					${str}
				}
			}
		`;
	}

}

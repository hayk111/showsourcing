import gql from 'graphql-tag';
import {
	GlobalQuery
} from '~global-services/_global/global.query.interface';



export class ShowQueries implements GlobalQuery {

	one = gql`
		subscription show($query: String!) {
			events(query: $query) {
				id
			}
		}`;

	many = gql`
		subscription shows(
			$take: Int,
			$skip: Int,
			$query: String!,
			$sortBy: String,
			$descending: Boolean
		) {
			events(query: $query, take: $take, skip: $skip, sortBy: $sortBy, descending: $descending) {
				description {
					name
					description
					startDate
					endDate
					logoImage {
						fileName
					}
					primaryColor
					secondaryColor
					venue {
						name
						countryCode
						addressFull
						city
					}
				}
			}
		}`;

	create = gql`
		mutation addShow($input: ShowInput!) {
			updateEvent(input: $input) {
				id
			}
		}
	`;

	update = gql`
		mutation updateShow($input: ShowInput!) {
			updateEvent(input: $input) {
				id
			}
		}
	`;

	deleteOne = gql`
		mutation show($id: String!) {
			deleteEvent(id: $id)
		}
	`;

	deleteMany = gql`
		mutation shows($query: String!) {
			deleteEvents(query: $query)
		}
	`;

	all = (str: string) => {
		return gql`
		subscription shows {
			events {
				${str}
			}
		}
	`;
	}

}


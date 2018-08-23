import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class EventQueries extends GlobalQueries {

	static readonly one = `
		id
		description {
			id
			name
			description
			startDate
			endDate
			supplierCount
			logoImage {
				id
				fileName
			}
			primaryColor
			secondaryColor
			venue {
				id
				name
				country
				addressFull
				city
			}
		}
	`;

	static readonly many = `
	description {
		id
		name
		description
		startDate
		endDate
		supplierCount
		logoImage {
			id
			fileName
		}
		primaryColor
		secondaryColor
		venue {
			id
			name
			country
			addressFull
			city
		}
	}`;



}

import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class EventQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('event', 'events');
	}

	oneDefaultSelection = `
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

	manyDefaultSelection = `
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

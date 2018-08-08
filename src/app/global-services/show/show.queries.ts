import gql from 'graphql-tag';
import {
	GlobalQuery
} from '~global-services/_global/global.query.interface';
import { BaseQueries } from '~global-services/_global/base-query.class';



export class ShowQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('event', 'events');
	}

	oneDefaultSelection = `
		booths {
			boothName,
			supplier {
				id,
				name,
				type,
				countryCode,
				keywords
			}
		}
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
			industry {
				name
			}
			primaryColor
			secondaryColor
			venue {
				id
				name
				countryCode
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
			logoImage {
				id
				fileName
			}
			primaryColor
			secondaryColor
			supplierCount
			venue {
				id
				name
				countryCode
				addressFull
				city
			}
		}
	`;

}


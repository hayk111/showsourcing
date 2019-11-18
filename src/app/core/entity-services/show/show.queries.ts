import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';



export abstract class ShowQueries extends GlobalQueries {


	static readonly one = `
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

	static readonly many = `
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


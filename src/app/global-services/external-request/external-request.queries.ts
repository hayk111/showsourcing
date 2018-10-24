import { GlobalQueries } from '~global-services/_global/global-queries.class';
import { ProductQueries } from '~global-services/product/product.queries';

export abstract class ExternalRequestQueries extends GlobalQueries {
	static readonly one = `
			name,
			description,
			companyName,
			quotes {
				id,
				status,
				comment,
				name,
				price,
				description,
				minimumOrderQuantity,
				moqDescription,
				${ProductQueries.packaging('innerCarton')},
				${ProductQueries.packaging('masterCarton')},
				${ProductQueries.priceMatrix}
				leadTimeValue,
				leadTimeUnit,
				sample,
				samplePrice
			},
			descriptor,
			targetedMOQ,
			status,
			supplier {
				id,
				name,
				address,
				country,
				logoImage {
					id,
					fileName
				}
			},
			recipients
		}
	}
	`;

	static readonly many = `
			name,
			description,
			companyName,
			quotes {
				id,
				status,
				comment,
				name,
				price,
				description,
				minimumOrderQuantity,
				moqDescription,
				${ProductQueries.packaging('innerCarton')},
				${ProductQueries.packaging('masterCarton')},
				${ProductQueries.priceMatrix}
				leadTimeValue,
				leadTimeUnit,
				sample,
				samplePrice
			},
			descriptor,
			targetedMOQ,
			status,
			supplier {
				id,
				name,
				address,
				country,
				logoImage {
					id,
					fileName
				}
			},
			recipients
	`;


}

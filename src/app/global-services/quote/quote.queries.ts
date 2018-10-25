import { GlobalQueries } from '~global-services/_global/global-queries.class';
import { ProductQueries } from '~global-services/product/product.queries';

export abstract class QuoteQueries extends GlobalQueries {
	static readonly one = `
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
	`;

	static readonly many = `
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
	`;
}

import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';
import { ProductQueries } from '~core/erm/services/product/product.queries';

export abstract class QuoteQueries extends GlobalQueries {
	static readonly one = `
    id,
		status,
		comment,
		name,
    ${ProductQueries.price()}
    description,
    harbour,
    incoTerms,
		minimumOrderQuantity,
    moqDescription,
    reference,
		${ProductQueries.packaging('innerCarton')},
		${ProductQueries.packaging('masterCarton')},
		${ProductQueries.priceMatrix}
		leadTimeValue,
		leadTimeUnit,
    sample,
    ${ProductQueries.supplier},
    samplePrice
  `;

	static readonly many = `
		id,
		status,
		comment,
		name,
    ${ProductQueries.price()}
    description,
    harbour,
    incoTerms,
		minimumOrderQuantity,
    moqDescription,
    reference,
		${ProductQueries.packaging('innerCarton')},
		${ProductQueries.packaging('masterCarton')},
		${ProductQueries.priceMatrix}
		leadTimeValue,
		leadTimeUnit,
    sample,
    samplePrice
	`;
}

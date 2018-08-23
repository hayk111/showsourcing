import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ProductQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('product', 'products');
	}

	// in a product there are many sub entities, those are utilities
	// so when we query a product we can do things like selectOne(id, ProductQueries.images)
	// to only get a response like this
	// product { id, images { id, filename }}
	// the ID of the product will be requested always.

	// the goal is to use those utilities a bit everywhere even if they don't match exactly the data we need
	// it makes the code easier to read. It means tho, that those sub queries must be quite exhaustive.
	static readonly images = `images { id, fileName }`;
	static readonly supplier = `supplier {
		id, name, address, country, favorite, officeEmail,
		logoImage { id, fileName }
		categories { id, name }
		images { id, fileName }
	}`;
	static readonly contacts = `supplier { contacts { id, name, email, jobTitle } }`;
	static readonly price = ` price { id, currency, value, baseCurrencyValue } `;
	static readonly category = `category { id, name }`;
	static readonly projects = `projects { id, name, productCount, description }`;
	static readonly event = ` event { id, name, description { id logoImage { id, fileName } } }`;
	static readonly statuses = `statuses { id, cancelled, status { id, name, category, step, inWorkflow } }`;
	static readonly tags = `tags { id, name }`;
	static readonly votes = `votes { id, value, user { id, firstName, lastName } }`;
	static readonly createdBy = `createdBy { id, firstName, lastName }`;
	static readonly priceMatrix = `priceMatrix { id, rows { id, label, price { id, value, currency } } }`;
	static readonly packaging = (name: string) => `${name} { id, height, width, length, unit, itemsQuantity, weight, weightUnit, }`;

	// This is the default selection when using selectOne or queryOne
	oneDefaultSelection = `
			name,
			description
			favorite,
			minimumOrderQuantity,
			moqDescription,
			score,
			leadTimeValue,
			leadTimeUnit,
			sample,
			samplePrice,
			creationDate
			${ProductQueries.supplier},
			${ProductQueries.images},
			${ProductQueries.price},
			${ProductQueries.category},
			${ProductQueries.projects},
			${ProductQueries.event},
			${ProductQueries.statuses},
			${ProductQueries.votes},
			${ProductQueries.packaging('innerCarton')}
			${ProductQueries.packaging('masterCarton')}
			${ProductQueries.priceMatrix}
			${ProductQueries.createdBy}
			`;

	manyDefaultSelection = `
			name,
			description,
			creationDate,
			favorite,
			score,
			minimumOrderQuantity,
			${ProductQueries.createdBy},
			${ProductQueries.images},
			${ProductQueries.supplier},
			${ProductQueries.contacts},
			${ProductQueries.category},
			${ProductQueries.price},
			${ProductQueries.statuses},
			${ProductQueries.votes},
			${ProductQueries.projects},
			${ProductQueries.tags}
		`;

	updateDefaultSelection = `
		id
		favorite
		votes {
			id
			value
		},
		projects {
			id
		}`;
}

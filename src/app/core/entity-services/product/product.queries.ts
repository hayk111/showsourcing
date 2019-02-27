import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ProductQueries extends GlobalQueries {

	// in a product there are many sub entities, those are utilities
	// so when we query a product we can do things like selectOne(id, ProductQueries.images)
	// to only get a response like this
	// product { id, images { id, filename }}
	// the ID of the product will be requested always.

	// the goal is to use those utilities a bit everywhere even if they don't match exactly the data we need
	// it makes the code easier to read. It means tho, that those sub queries must be quite exhaustive.
	static readonly images = `images { id, orientation, imageType, urls { id, url } }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly supplier = `supplier {
		id, name, address, country, favorite, officeEmail,
		logoImage { id, urls { url } }
		categories { id, name }
		images { id, urls { url }, imageType }
	}`;
	static readonly price = (name = 'price') => `${name} { id, currency, value } `;
	static readonly category = `category { id, name }`;
	static readonly projects = `projects { id, name, description }`;
	static readonly event = `event { id, name, description { id name description logoImage { id, urls { id, url } } } }`;
	static readonly status = `status { id, name, category, step, inWorkflow }`;
	static readonly tags = `tags { id, name }`;
	// uncomment and replace when the Image.creationDate bug is fixed on votes, avatar { id, fileName, imageType, creationDate }
	static readonly votes = `votes { id, value, user { id, firstName, lastName } }`;
	static readonly createdBy = `createdBy { id, firstName, lastName, avatar { id, urls { id, url } } }`;
	static readonly comments = `comments { id, text, ${ProductQueries.createdBy}, creationDate }`;
	static readonly priceMatrix = `priceMatrix { id, rows { id, label, price { id, value, currency } } }`;
	static readonly packaging = (name: string) => `${name} { id, height, width, length, unit, itemsQuantity, weight, weightUnit, }`;
	static readonly assignee = `assignee { id, firstName, lastName, avatar { id, urls { id, url } }}`;
	static readonly extendedFields = `extendedFields { id, value, definition { id, label, type, order }}`;
	// This is the default selection when using selectOne or queryOne
	static readonly one = `
			name,
			description
			favorite,
			minimumOrderQuantity,
			moqDescription,
			score,
			leadTimeValue,
			leadTimeUnit,
			sample,
			creationDate,
			archived,
			deleted,
			${ProductQueries.assignee}
			${ProductQueries.attachments}
			${ProductQueries.category}
			${ProductQueries.comments}
			${ProductQueries.createdBy}
			${ProductQueries.event}
			${ProductQueries.extendedFields}
			${ProductQueries.images}
			${ProductQueries.packaging('innerCarton')}
			${ProductQueries.packaging('masterCarton')}
			${ProductQueries.price('samplePrice')}
			${ProductQueries.price()}
			${ProductQueries.priceMatrix}
			${ProductQueries.projects}
			${ProductQueries.status}
			${ProductQueries.supplier}
			${ProductQueries.tags}
			${ProductQueries.votes}
			`;

	static readonly many = `
			name,
			description,
			creationDate,
			favorite,
			score,
			minimumOrderQuantity,
			lastUpdatedDate,
			deleted,
			archived,
			deleted,
			${ProductQueries.comments},
			${ProductQueries.createdBy},
			${ProductQueries.images},
			${ProductQueries.supplier},
			${ProductQueries.category},
			${ProductQueries.price()},
			${ProductQueries.packaging('innerCarton')}
			${ProductQueries.packaging('masterCarton')}
			${ProductQueries.status},
			${ProductQueries.votes},
			${ProductQueries.projects},
			${ProductQueries.tags}
			`;

	static readonly update = `
		favorite
		lastUpdatedDate,
		archived,
		score
		${ProductQueries.status}
		${ProductQueries.votes}
		${ProductQueries.projects}
		${ProductQueries.comments}`;
}

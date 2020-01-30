import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export class SampleQueries extends GlobalQueries {

	static readonly images = `images { id, orientation, imageType, urls { id, url } }`;
	static readonly createdBy = `createdBy { id, firstName, lastName, avatar { id, urls { id, url } } }`;
	static readonly assignee = `assignee { id, firstName, lastName, avatar { id, urls { id, url } }}`;
	static readonly supplier = `supplier {
		id, name, address, country, favorite, officeEmail,
		logoImage { id, urls { id, url } }
		categories { id, name }
		images { id, urls { id, url }, imageType }
	}`;
	static readonly product = `product {
		id, name, reference, ${SampleQueries.images}, favorite, description,
	}`;
	static readonly price = (name = 'price') => `${name} { id, currency, value } `;
	static readonly status = `status { id, name, category, inWorkflow, step }`;
	static readonly user = (name) => `${name} { id, lastName, firstName, avatar { id, fileName, urls { id, url} } }`;
	static readonly comments = `comments {
		id, text, creationDate, lastUpdatedDate, deleted,
		${SampleQueries.user('createdBy')},
		${SampleQueries.user('lastUpdatedBy')}
	}`;
	static readonly definition = (name: string) => `${name} { id, label, type, order, metadata }`;
	static readonly extendedFields = `extendedFields {
		id, value,
		selectorValues { id, value, ${SampleQueries.definition('fieldDefinition')} },
		${SampleQueries.definition('definition')}
	}`;

	// TODO BackEnd add type
	static readonly one = `
		archived,
		name,
		reference,
		description
		creationDate,
		lastUpdatedDate,
		deleted,
		${SampleQueries.product}
		${SampleQueries.supplier}
		${SampleQueries.images}
		${SampleQueries.price()}
		${SampleQueries.createdBy}
		${SampleQueries.assignee}
		${SampleQueries.status}
		${SampleQueries.comments}
		${SampleQueries.extendedFields}
	`;

	static readonly many = `
		archived,
		name,
		reference,
		description
		creationDate,
		lastUpdatedDate,
		deleted,
		${SampleQueries.product}
		${SampleQueries.supplier}
		${SampleQueries.images}
		${SampleQueries.price()}
		${SampleQueries.createdBy}
		${SampleQueries.assignee}
		${SampleQueries.status}
		${SampleQueries.comments}
		${SampleQueries.extendedFields}
		`;

}

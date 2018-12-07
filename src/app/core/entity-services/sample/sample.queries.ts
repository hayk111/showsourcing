import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export class SampleQueries extends GlobalQueries {

	static readonly images = `images { id, orientation, imageType, urls { url } }`;
	static readonly createdBy = `createdBy { id, firstName, lastName, avatar { id, urls { url } } }`;
	static readonly assignee = `assignee { id, firstName, lastName, avatar { id, urls { url } }}`;
	static readonly supplier = `supplier {
		id, name, address, country, favorite, officeEmail,
		logoImage { id, urls { url } }
		categories { id, name }
		images { id, urls { url }, imageType }
	}`;
	static readonly product = `product {
		id, name, ${SampleQueries.images}, favorite, description,
	}`;
	static readonly price = (name = 'price') => `${name} { id, currency, value } `;
	static readonly status = `status { id, name, category, inWorkflow }`;

	static readonly one = `
		name,
		reference,
		description
		creationDate,
		deleted,
		${SampleQueries.product}
		${SampleQueries.supplier}
		${SampleQueries.images}
		${SampleQueries.price()}
		${SampleQueries.createdBy}
		${SampleQueries.assignee}
		${SampleQueries.status}
	`;

	static readonly many = `
		name,
		reference,
		description
		creationDate,
		deleted,
		${SampleQueries.product}
		${SampleQueries.supplier}
		${SampleQueries.images}
		${SampleQueries.price()}
		${SampleQueries.createdBy}
		${SampleQueries.assignee}
		${SampleQueries.status}
	`;

}

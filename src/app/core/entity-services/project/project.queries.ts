import { GlobalQueries } from '~entity-services/_global/global-queries.class';


export abstract class ProjectQueries extends GlobalQueries {

	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"projects" query:"archived == false AND deleted == false") { ... on ProductCollection { count }}`;

	static readonly one = `
			name,
			description,
			lastUpdatedDate,
			creationDate,
			createdBy { id, firstName, lastName },
			logoImage { id, urls { url } }
			${ProjectQueries.productsLinked}`;

	static readonly many = `
		name,
		createdBy { id, firstName, lastName },
		lastUpdatedDate,
		creationDate,
		description,
		deleted
		${ProjectQueries.productsLinked}`;
}

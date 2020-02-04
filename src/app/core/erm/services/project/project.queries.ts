import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';


export abstract class ProjectQueries extends GlobalQueries {

	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"projects" query:"deleted == false AND archived == false") { ... on ProductCollection { count }}`;
	static readonly user = (name: string) => `${name} { id, firstName, lastName, avatar { id, urls { id, url } } }`;

	// TODO BackEnd add dueDate
	// TODO BackEnd add done
	static readonly one = `
		name,
		description,
		lastUpdatedDate,
		creationDate,
		logoImage { id, urls { url } }
		${ProjectQueries.user('createdBy')}
		${ProjectQueries.user('lastUpdatedBy')}
		${ProjectQueries.productsLinked}`;

	static readonly many = `
		name,
		lastUpdatedDate,
		creationDate,
		description,
		deleted
		${ProjectQueries.user('lastUpdatedBy')}
		${ProjectQueries.user('createdBy')}
		${ProjectQueries.productsLinked}`;
}

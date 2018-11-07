import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';


export abstract class ProjectQueries extends GlobalQueries {

	static readonly products = `products { id, name, description }`;
	// tslint:disable-next-line:max-line-length
	static readonly productsCount = `productsCount:  _count(type: "Product", field: "projects.id", query:"archived == false AND deleted == false")`;

	static readonly one = `
			name,
			description,
			lastUpdatedDate,
			creationDate,
			createdBy { id, firstName, lastName },
			logoImage { id, fileName }
			${ProjectQueries.productsCount}`;

	static readonly many = `
		name,
		createdBy { id, firstName, lastName },
		lastUpdatedDate,
		creationDate,
		description,
		deleted,
		${ProjectQueries.productsCount}`;

}

import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class ProjectQueries extends GlobalQueries {

	static readonly products = `products { id, name, description }`;

	static readonly one = `
			name,
			description,
			lastUpdatedDate,
			creationDate,
			createdBy { id, firstName, lastName },
			logoImage { id, fileName }`;
			// ${ProjectQueries.products}`;
	static readonly many = `name, createdBy { id, firstName, lastName }, productCount, lastUpdatedDate, creationDate, description`;

}

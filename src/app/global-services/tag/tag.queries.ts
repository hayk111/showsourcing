import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class TagQueries extends GlobalQueries {


	static readonly many = `
		name,
		creationDate,
		createdBy {
			id,
			firstName,
			lastName
		}
	`;

}

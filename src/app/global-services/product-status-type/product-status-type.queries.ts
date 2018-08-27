import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class ProductStatusTypeQueries extends GlobalQueries {


	static readonly one = `
			name,
			category,
			step
	`;

	static readonly many = `
			name,
			category,
			step
	`;

	static readonly all = `
			name,
			category,
			step
	`;
}

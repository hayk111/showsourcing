import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class ProductStatusQueries extends GlobalQueries {

	static readonly one = `
		id,
		name,
		inWorkflow,
		step,
		category
	`;

}

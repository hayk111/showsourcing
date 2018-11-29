import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class SupplierStatusQueries extends GlobalQueries {

	static readonly one = `
	cancelled,
	status {
		id,
		name,
		inWorkflow,
		step,
		category
	}
	`;

}

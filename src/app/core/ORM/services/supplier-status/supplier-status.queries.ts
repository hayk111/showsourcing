import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierStatusQueries extends GlobalQueries {

	static readonly one = `
		name,
		inWorkflow,
		step,
		category,
	`;
	// final,
	// deleted

	static readonly many = `
		name,
		inWorkflow,
		step,
		category,
	`;
	// final,
	// deleted

	static readonly all = `
		name,
		inWorkflow,
		step,
		category,
	`;
	// final,
	// deleted

}

import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierStatusTypeQueries extends GlobalQueries {

	static readonly one = `
		name,
		category,
		inWorkflow,
		step
	`;

	static readonly many = `
		name,
		category,
		inWorkflow,
		step
	`;

	static readonly all = `
		name,
		category,
		inWorkflow,
		step
	`;
}

import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierStatusQueries extends GlobalQueries {

	static readonly one = `
		id,
		name,
		inWorkflow,
		step,
		category
	`;

	static readonly many = `
		id,
		name,
		inWorkflow,
		step,
		category
	`;

	static readonly all = `
		id,
		name,
		inWorkflow,
		step,
		category
	`;

}

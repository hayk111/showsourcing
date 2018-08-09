import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class SupplierStatusQueries extends BaseQueries implements GlobalQuery {

	oneDefaultSelection = `
	cancelled,
	status {
		id,
		name,
		inWorkflow,
		step,
		category
	}
	`;

	constructor() {
		super('supplierStatus', 'supplierStatuses')
	}
}

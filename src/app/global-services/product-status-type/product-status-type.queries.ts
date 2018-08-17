import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class ProductStatusTypeQueries extends BaseQueries implements GlobalQuery {

	constructor() { super('productStatusType', 'productStatusTypes'); }

	oneDefaultSelection = `
			name,
			category,
			step
	`;

	manyDefaultSelection = `
			name,
			category,
			step
	`;

	allDefaultSelection = `
			name,
			category,
			step
	`;
}

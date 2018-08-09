import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class CategoryQueries extends BaseQueries implements GlobalQuery {

	oneDefaultSelection = `
			name,
			createdBy {
				id,
				firstName,
				lastName
			}
	`;

	manyDefaultSelection = `
		name,
		createdBy {
			id,
			firstName,
			lastName
		}
	`;

	constructor() {
		super('category', 'categories')
	}

}

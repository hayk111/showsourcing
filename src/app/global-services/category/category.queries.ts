import { GlobalQuery } from '~global-services/_global/global.query.interface';
import gql from 'graphql-tag';
import { BaseQueries } from '~global-services/_global/base-query.class';

export class CategoryQueries extends BaseQueries implements GlobalQuery {

	constructor() {
		super('category', 'categories')
	}

}

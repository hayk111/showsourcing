import { QueryBuilder } from '../_query-builder.class';
import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class ProductQueries extends BaseQueries {
	// for specify fields on specific queries, we can do like this
	// private qb = new QueryBuilder('product');
	// queryOne = this.qb.queryOne(`...`);

	// we can also add entiere custom queries to pass with apiSrv.query()

	constructor() {
		const defaultFields = `
		id
		name
		status {
			${StatusQueries.defaultFields}
		}
	`;
		super('Product', defaultFields);
	}
}

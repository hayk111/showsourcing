import { QueryBuilder } from '../_query-builder.class';
import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class ProductQueries extends BaseQueries {
	// for specify fields on specific queries, we can do like this
	// private qb = new QueryBuilder('product');
	// queryOne = this.qb.queryOne(`...`);

	// we can also add entiere custom queries to pass with apiSrv.query()

	static defaultFields = `
		id
		name
		_version
		favorite
		status {
			${StatusQueries.defaultFields}
		}
		supplier { name }
		assignee { firstName lastName }
		score
		properties { name value }
		createdBy { firstName lastName }
		createdAt
	`;

	constructor() {
		super('Product', ProductQueries.defaultFields);
	}
}

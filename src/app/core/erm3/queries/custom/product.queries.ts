import { QueryBuilder } from '../_query-builder.class';
import { BaseQueries } from '../base.queries';

export class ProductQueries extends BaseQueries {
	// TODO for entities with many fields, we can do like this
	// private qb = new QueryBuilder('product');
	// queryOne = this.qb.queryOne(`...`);
	defaultFields = `
		id
		name
		_version
		status {
			id
			name
			inWorkflow
			category
			step
			final
		}
	`;
	constructor() {
		super('Product', 'id name _version status{ id name }');
	}
}

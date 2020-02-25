import { BaseQueries } from '../_base.queries';

export class ProductQueries extends BaseQueries {
	constructor() {
		super('product');
	}
	queryOne = this.qb.queryOne('name, supplier');
}

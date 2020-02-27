import { BaseQueries } from '../base.queries';

export class ProductQueries extends BaseQueries {
	constructor() {
		super('product');
	}
	queryOne = this.qb.queryOne('name, supplier');
}

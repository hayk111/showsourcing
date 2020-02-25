import { QueryBuilder } from './_query-builder.class';


export class BaseQueries {

	protected qb = new QueryBuilder(this.name);
	queryOne = this.qb.queryOne('name');
	queryMany = this.qb.queryMany('name');
	queryAll = this.qb.queryAll('name');
	create = this.qb.create('name');
	update = this.qb.update('name');
	delete = this.qb.delete('name');

	constructor(protected name: string) {}

}

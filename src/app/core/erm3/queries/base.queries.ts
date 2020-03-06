import { QueryBuilder } from './_query-builder.class';
import { Typename } from '../entity-name.type';


export class BaseQueries {

	protected qb = new QueryBuilder(this.name as string);
	queryOne = this.qb.queryOne(this.defaultFields);
	queryMany = this.qb.queryMany(this.defaultFields);
	queryAll = this.qb.queryAll(this.defaultFields);
	create = this.qb.create(this.defaultFields);
	update = this.qb.update(this.defaultFields);
	delete = this.qb.delete(this.defaultFields);

	constructor(protected name: Typename, protected defaultFields: string = 'name') {}

}

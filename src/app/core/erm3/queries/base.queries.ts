import { QueryBuilder } from './_query-builder.class';
import { Typename } from '../typename.type';


export class BaseQueries {

	protected qb = new QueryBuilder(this.typename as string);
	queryOne = this.qb.queryOne(this.defaultFields);
	queryMany = this.qb.queryMany(this.defaultFields);
	queryAll = this.qb.queryAll(this.defaultFields);
	create = this.qb.create(this.defaultFields);
	update = this.qb.update(this.defaultFields);
	delete = this.qb.delete(this.defaultFields);

	constructor(protected typename: Typename, protected defaultFields: string = 'name') {}

}

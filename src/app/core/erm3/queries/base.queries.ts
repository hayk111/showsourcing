import { QueryBuilder } from './_query-builder.class';
import { EntityName } from '../entity-name.type';
import { QueryType } from './query-type.enum';

export class BaseQueries {
	protected qb = new QueryBuilder(this.entityName);
	queryOne = this.qb.queryOne(this.defaultFields);
	queryMany = this.qb.queryMany(this.defaultFields);
	// queryAll = this.qb.queryAll(this.defaultFields);
	// queryBy = this.qb.queryBy(this.defaultFields); // ? is the defaults fileds giving an error ?
	create = this.qb.create(this.defaultFields);
	update = this.qb.update(this.defaultFields);
	delete = this.qb.delete(this.defaultFields);
	queryAll = {};

	constructor(
		protected entityName: EntityName,
		protected defaultFields: string = 'name',
		protected byEntityNames: EntityName[],
		protected queries: QueryType[] = [
			QueryType.QUERY_ONE,
			QueryType.QUERY_MANY,
			QueryType.QUERY_BY,
			QueryType.CREATE,
			QueryType.UPDATE,
			QueryType.DELETE
		]
	) {
		queries.forEach((queryType) => {
			[queryType] = this.qb[queryType](this.defaultFields);
		});
		byEntityNames.forEach(name => {
			this['queryBy' + name] = this.qb.queryBy;
		});
	}
}

apiService.queryBy('Product', 'Team');

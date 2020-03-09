import { QueryBuilder } from './_query-builder.class';
<<<<<<< HEAD
import { Typename } from '../typename.type';
import { QueryType } from './query-type.enum';


export class BaseQueries {

	protected qb = new QueryBuilder(this.typename);

	constructor(
		protected typename: Typename,
		protected defaultFields: string = 'name',
		protected byTypenames: Typename[] = ['Team'],
=======
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
>>>>>>> 0848fcee65754a93b03addcb320fb1f82d50316a
		protected queries: QueryType[] = [
			QueryType.QUERY_ONE,
			QueryType.QUERY_MANY,
			QueryType.QUERY_BY,
			QueryType.CREATE,
			QueryType.UPDATE,
			QueryType.DELETE
		]
	) {
<<<<<<< HEAD

		queries.forEach((queryType) => {
			this.qb.byTypenames = byTypenames;
			this[queryType] = this.qb[queryType](this.defaultFields);
=======
		queries.forEach((queryType) => {
			[queryType] = this.qb[queryType](this.defaultFields);
		});
		byEntityNames.forEach(name => {
			this['queryBy' + name] = this.qb.queryBy;
>>>>>>> 0848fcee65754a93b03addcb320fb1f82d50316a
		});
	}
}

apiService.queryBy('Product', 'Team');

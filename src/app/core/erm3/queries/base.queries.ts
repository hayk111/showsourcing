import { QueryBuilder } from './_query-builder.class';
<<<<<<< HEAD
import { Typename } from '../typename.type';


export class BaseQueries {

	protected qb = new QueryBuilder(this.typename as string);
=======
import { EntityName } from '../entity-name.type';
import { QueryType } from './query-type.enum';

export class BaseQueries {
<<<<<<< HEAD
	protected qb = new QueryBuilder(this.entityName);
>>>>>>> queryBy in progress
	queryOne = this.qb.queryOne(this.defaultFields);
	queryMany = this.qb.queryMany(this.defaultFields);
	// queryAll = this.qb.queryAll(this.defaultFields);
	// queryBy = this.qb.queryBy(this.defaultFields); // ? is the defaults fileds giving an error ?
	create = this.qb.create(this.defaultFields);
	update = this.qb.update(this.defaultFields);
	delete = this.qb.delete(this.defaultFields);
	queryAll = {};
=======
	protected qb = new QueryBuilder(this.entityName, this.byEntityNames);
	// queryOne = this.qb.queryOne(this.defaultFields);
	// queryMany = this.qb.queryMany(this.defaultFields);
	// // queryAll = this.qb.queryAll(this.defaultFields);
	// // queryBy = this.qb.queryBy(this.defaultFields); // ? is the defaults fileds giving an error ?
	// create = this.qb.create(this.defaultFields);
	// update = this.qb.update(this.defaultFields);
	// delete = this.qb.delete(this.defaultFields);
>>>>>>> queryBy, must test the owner

<<<<<<< HEAD
	constructor(protected typename: Typename, protected defaultFields: string = 'name') {}

=======
	constructor(
		protected entityName: EntityName,
		protected defaultFields: string = 'name',
		protected byEntityNames: EntityName[] = ['Team'],
		protected queries: QueryType[] = [
			QueryType.QUERY_ONE,
			QueryType.QUERY_MANY,
			QueryType.QUERY_BY,
			QueryType.CREATE,
			QueryType.UPDATE,
			QueryType.DELETE
		]
	) {
		// add methods like queryOne(), create(), ... for all query types passed
		queries.forEach(queryType => {
			this[queryType] = this.qb[queryType](this.defaultFields);
		});

		// byEntityNames.forEach(name => {
		// 	this.byEntities = this.qb.queryBy;
		// });
	}
>>>>>>> queryBy in progress
}

// apiService.queryBy('Product', 'Team');

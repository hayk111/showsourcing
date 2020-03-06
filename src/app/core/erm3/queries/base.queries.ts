import { QueryBuilder } from './_query-builder.class';
import { Typename } from '../typename.type';
import { QueryType } from './query-type.enum';


export class BaseQueries {

	protected qb = new QueryBuilder(this.typename);

	constructor(
		protected typename: Typename,
		protected defaultFields: string = 'name',
		protected byEntityNames: Typename[] = ['Team'],
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
			this[queryType] = this.qb[queryType](this.defaultFields);
		});
	}
}

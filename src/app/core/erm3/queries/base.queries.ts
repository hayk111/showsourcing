import { QueryBuilder } from './_query-builder.class';
import { Typename } from '../typename.type';
import { QueryType } from './query-type.enum';


export class BaseQueries {

	protected qb = new QueryBuilder(this.typename);

	constructor(
		protected typename: Typename,
		protected defaultFields: string = 'id name _version',
		protected queries: QueryType[] = [
			QueryType.GET,
			QueryType.SEARCH_BY,
			QueryType.LIST_BY,
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

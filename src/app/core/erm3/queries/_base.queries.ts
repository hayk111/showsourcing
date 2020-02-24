import { DocumentNode } from 'graphql';
import { QueryBuilder } from './_query-builder.class';
import { QueryType } from './_query-type.enum';


export class BaseQueries {

	protected qb = new QueryBuilder(this.name);
	queryOne = this.qb.queryOne('name');
	queryMany = this.qb.queryMany('name');
	queryAll = this.qb.queryAll('name');
	create = this.qb.create('name');
	update = this.qb.update('name');
	delete = this.qb.delete('name');

	constructor(protected name: string) {}

	/** returns the query, queryName and body of a specified query*/
	getQueryInfo(queryType: QueryType) {
		const query = this[queryType];
		const queryName = this.getQueryName(query);
		const body = this.getQueryBody(query);
		return { query, queryName, body };
	}

	/** gets the query name from a gql statement */
	getQueryName(gql: DocumentNode): string {
		try {
			return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}
	}


	/** gets the content of a graphql query */
	getQueryBody(gql: DocumentNode): string {
		return gql.loc.source.body;
	}

}

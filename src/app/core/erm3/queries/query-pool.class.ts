import { DocumentNode } from 'graphql';
import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { CompanyQueries } from './custom/company.queries';
import { TeamQueries } from './custom/team.queries';
import { QueryType } from './query-type.enum';

export class QueryPool {
	static map = {
		Category: new BaseQueries('Category'), // provided by the api
		// Company: new CompanyQueries('Company'), // provided by the api
		Company: new BaseQueries('Company'), // provided by the api
		Contact: new BaseQueries('Contact'), // provided by the api
		Descriptor: new BaseQueries('Descriptor', 'target'), // provided by the api
		Image: new BaseQueries('Image', `fileName`), // provided by the api
		Product: new BaseQueries('Product'), // provided by the api
		Supplier: new BaseQueries('Supplier'), // provided by the api
		Task: new BaseQueries('Task'), // provided by the api
		User: new BaseQueries('User', `firstName`),
		// Team: new TeamQueries('Team'), // provided by the api
		Team: new BaseQueries('Team'), // provided by the api
		TeamUser: new BaseQueries('TeamUser', 'teamId', ['User']) // provided by the api
	};

	/** returns the query, queryName and body of a specified query*/
<<<<<<< HEAD
<<<<<<< HEAD
	static getQueryInfo(typename: Typename, queryType: QueryType) {
		const queries = QueryPool.map[typename];
=======
	static getQueryInfo(entityName: EntityName, queryType: QueryType | string) {
=======
	static getQueryInfo(
		entityName: EntityName,
		queryType: QueryType,
		byEntityName: EntityName | 'Owner' = null
	) {
>>>>>>> queryBy, must test the owner
		const queries = QueryPool.map[entityName];
>>>>>>> queryBy in progress
		if (!queries) {
			throw Error(`The query pool doesn't contain such a member ${queryType}`);
		}
		const query = queryType === QueryType.QUERY_BY
				? queries[queryType][byEntityName]
				: queries[queryType];
		const queryName = this.getQueryName(query);
		const body = this.getQueryBody(query);
		return { query, queryName, body };
	}

	/** gets the query name from a gql statement */
	static getQueryName(gql: DocumentNode): string {
		try {
			return (gql.definitions[0] as any).selectionSet.selections[0].name.value;
		} catch (e) {
			throw Error('query name not found in apollo client');
		}
	}

	/** gets the content of a graphql query */
	static getQueryBody(gql: DocumentNode): string {
		return gql.loc.source.body;
	}
}

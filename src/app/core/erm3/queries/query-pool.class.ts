import { DocumentNode } from 'graphql';
import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { QueryType } from './query-type.enum';

export class QueryPool {
	static map = {
		Category: new BaseQueries('Category', undefined, []),
		// Company: new CompanyQueries('Company'),
		Company: new BaseQueries('Company', undefined, ['Owner']),
		Contact: new BaseQueries('Contact', undefined, []),
		Descriptor: new BaseQueries('Descriptor', 'target', []),
		Image: new BaseQueries('Image', `fileName`, []),
		Product: new BaseQueries('Product', undefined, []),
		Supplier: new BaseQueries('Supplier', undefined, []),
		Task: new BaseQueries('Task', undefined, []),
		User: new BaseQueries('User', `firstName`, []),
		// Team: new TeamQueries('Team'),
		Team: new BaseQueries('Team', undefined, []),
		TeamUser: new BaseQueries('TeamUser', 'teamId', ['User'])
	};

	/** returns the query, queryName and body of a specified query*/
	static getQueryInfo(
		typename: Typename,
		queryType: QueryType,
		byEntityName: Typename | 'Owner' = null
	) {
		const queries = QueryPool.map[typename];
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

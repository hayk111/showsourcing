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
		Product: new BaseQueries('Product', 'id name createdAt', []),
		Supplier: new BaseQueries('Supplier', undefined, []),
		Task: new BaseQueries('Task', undefined, []),
		User: new BaseQueries('User', `firstName`, []),
		// Team: new TeamQueries('Team'),
		Team: new BaseQueries('Team', undefined, []),
		TeamUser: new BaseQueries('TeamUser', 'team { id name } role', ['User'])
	};

	static getQuery(
		typename: Typename,
		queryType: QueryType,
		byEntityName: Typename | 'Owner' = null
	) {
		const queries = QueryPool.map[typename];
		if (!queries) {
			throw Error(`The query pool doesn't contain such a member ${queryType}`);
		}
		const query = queryType === QueryType.LIST_BY
		? queries[queryType][byEntityName] // listBy return an object {byEntity: gql}
		: queries[queryType];
		if (!query) {
			throw Error(`Query ${queryType} not found for ${typename}`);
		}
		return query;
	}

}

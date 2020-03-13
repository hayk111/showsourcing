import { DocumentNode } from 'graphql';
import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { QueryType } from './query-type.enum';

export class QueryPool {
	static map = {
		Category: new BaseQueries('Category', undefined, []),
		Company: new BaseQueries('Company', undefined, ['Owner']),
		Contact: new BaseQueries('Contact', undefined, []),
		Descriptor: new BaseQueries('Descriptor', 'target', []),
		Image: new BaseQueries('Image', `fileName`, []),
		Product: new BaseQueries('Product', undefined, []),
		Supplier: new BaseQueries('Supplier', undefined, []),
		Task: new BaseQueries('Task', undefined, []),
		User: new BaseQueries('User', `firstName`, []),
		Team: new BaseQueries('Team', undefined, []),
		TeamUser: new BaseQueries('TeamUser', 'team { id name } role', ['User']),
		Attachment: new BaseQueries('Attachment', 'fileName', []),
		Comment: new BaseQueries('Comment', 'message', []),
		HelperList: new BaseQueries('HelperList', 'code label helperType', []),
		Event: new BaseQueries('Event', undefined, []),
		EventDescription: new BaseQueries('EventDescription', undefined, []),
		Venue: new BaseQueries('Venue', undefined, []),
		Industry: new BaseQueries('Industry', undefined, []),
		Export: new BaseQueries('Export', 'format', []),
		Invitation: new BaseQueries('Invitation', 'email', []),
		Project: new BaseQueries('Project', undefined, []),
		Sample: new BaseQueries('Sample', undefined, []),
		Tag: new BaseQueries('Tag', undefined, [])
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

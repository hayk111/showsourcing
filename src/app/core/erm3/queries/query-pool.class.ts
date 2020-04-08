import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { QueryType } from './query-type.enum';

export class QueryPool {
	static map = {
		Category: new BaseQueries('Category', 'id name _version'),
		Company: new BaseQueries('Company'),
		Contact: new BaseQueries('Contact'),
		Descriptor: new BaseQueries('Descriptor', 'target'),
		Image: new BaseQueries('Image', `fileName`),
		Product: new BaseQueries('Product', 'id name _version'),
		Supplier: new BaseQueries('Supplier'),
		Task: new BaseQueries('Task'),
		User: new BaseQueries('User', `firstName`),
		Team: new BaseQueries('Team'),
		TeamUser: new BaseQueries('TeamUser', 'team { id name } role'),
		Attachment: new BaseQueries('Attachment', 'fileName'),
		Comment: new BaseQueries('Comment', 'message'),
		Constant: new BaseQueries('Constant', 'code label helperType'),
		Event: new BaseQueries('Event', 'id', []),
		EventDescription: new BaseQueries('EventDescription'),
		Venue: new BaseQueries('Venue'),
		Industry: new BaseQueries('Industry'),
		Export: new BaseQueries('Export', 'format'),
		Invitation: new BaseQueries('Invitation', 'email'),
		Project: new BaseQueries('Project'),
		Sample: new BaseQueries('Sample'),
		Tag: new BaseQueries('Tag', 'id name _version'),
		Vote: new BaseQueries('Vote', 'id message nodeId'),
		WorkflowStatus: new BaseQueries('WorkflowStatus')
	};

	static getQuery(
		typename: Typename,
		queryType: QueryType,
	) {
		const queries = QueryPool.map[typename];
		if (!queries) {
			throw Error(`The query pool doesn't contain such a member ${typename}`);
		}
		const query = queries[queryType];
		if (!query) {
			throw Error(`Query ${queryType} not found for ${typename}`);
		}
		return query;
	}

}

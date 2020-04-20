import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { QueryType } from './query-type.enum';

export class QueryPool {
	static map = {
		Category: new BaseQueries('Category'),
		Company: new BaseQueries('Company'),
		Contact: new BaseQueries('Contact'),
		Descriptor: new BaseQueries('Descriptor', 'id target'),
		Image: new BaseQueries('Image', `id fileName`),
		Product: new BaseQueries('Product'),
		Supplier: new BaseQueries('Supplier'),
		Task: new BaseQueries('Task'),
		User: new BaseQueries('User', `firstName`),
		Team: new BaseQueries('Team'),
		TeamUser: new BaseQueries('TeamUser', 'team { id name } user { firstName lastName email } role'),
		Attachment: new BaseQueries('Attachment', 'id fileName'),
		Comment: new BaseQueries('Comment', 'id message'),
		Constant: new BaseQueries('Constant', 'id code label helperType'),
		Event: new BaseQueries('Event', 'id _version', []),
		EventDescription: new BaseQueries('EventDescription'),
		Venue: new BaseQueries('Venue'),
		Industry: new BaseQueries('Industry'),
		Invitation: new BaseQueries('Invitation', 'id email status'),
		Export: new BaseQueries('Export'),
		Project: new BaseQueries('Project'),
		PropertyOption: new BaseQueries('PropertyOption', 'id value _version'),
		Sample: new BaseQueries('Sample'),
		Tag: new BaseQueries('Tag'),
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

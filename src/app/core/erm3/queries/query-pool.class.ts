import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { QueryType } from './query-type.enum';
import { ProductQueries } from './custom/product.queries';
import { StatusQueries } from './custom/status.queries';

export class QueryPool {
	static map = {
		Category: new BaseQueries('Category'),
		Company: new BaseQueries('Company'),
		Comment: new BaseQueries('Comment', 'id message'),
		Contact: new BaseQueries('Contact'),
		Descriptor: new BaseQueries('Descriptor', 'id target'),
		Image: new BaseQueries('Image', `id fileName`),
		Product: new ProductQueries(),
		Supplier: new BaseQueries('Supplier', 'id name _version'),
		Task: new BaseQueries('Task', 'id name _version'),
		User: new BaseQueries('User', `firstName`),
		Team: new BaseQueries('Team'),
		TeamUser: new BaseQueries('TeamUser', 'team { id name } user { firstName lastName email } role'),
		Attachment: new BaseQueries('Attachment', 'id fileName'),
		Constant: new BaseQueries('Constant', 'id code label helperType'),
		Event: new BaseQueries('Event', 'id _version', []),
		EventDescription: new BaseQueries('EventDescription'),
		Venue: new BaseQueries('Venue'),
		Industry: new BaseQueries('Industry'),
		Invitation: new BaseQueries('Invitation', 'id email status'),
		Export: new BaseQueries('Export'),
		Project: new BaseQueries('Project', 'id name _version'),
		PropertyOption: new BaseQueries('PropertyOption', 'id value _version'),
		Sample: new BaseQueries('Sample', 'id name _version'),
		Tag: new BaseQueries('Tag'),
		Vote: new BaseQueries('Vote', 'id message rating nodeId _version createdBy { id }'),
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

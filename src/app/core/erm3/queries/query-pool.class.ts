import { Typename } from '../typename.type';
import { BaseQueries } from './base.queries';
import { QueryType } from './query-type.enum';
import { ProductQueries } from './custom/product.queries';
import { StatusQueries } from './custom/status.queries';

export class QueryPool {
	static map = {
		Attachment: new BaseQueries('Attachment', 'id fileName _version'),
		Category: new BaseQueries('Category', 'id name'),
		Company: new BaseQueries('Company', 'id name'),
		Constant: new BaseQueries('Constant', 'id code label helperType _version'),
		Comment: new BaseQueries('Comment', 'id message _version'),
		Contact: new BaseQueries('Contact'),
		Descriptor: new BaseQueries('Descriptor', 'id target _version'),
		Event: new BaseQueries('Event', 'id _version', []),
		EventDescription: new BaseQueries('EventDescription'),
		Export: new BaseQueries('Export'),
		Image: new BaseQueries('Image', `id fileName _version`),
		Industry: new BaseQueries('Industry'),
		Invitation: new BaseQueries('Invitation', 'id email status _version'),
		// tslint:disable-next-line:max-line-length
		Product: new BaseQueries('Product', 'id name _version favorite category { name } supplier { name } assignee { firstName lastName } score properties { name value } createdBy { firstName lastName } createdAt'),
		// tslint:disable-next-line:max-line-length
		Project: new BaseQueries('Project', 'id name _version dueDate createdBy { firstName lastName } assignee { firstName lastName } createdAt'),
		PropertyOption: new BaseQueries('PropertyOption', 'id value _version'),
		// tslint:disable-next-line:max-line-length
		Supplier: new BaseQueries('Supplier', 'id name _version favorite category { name } assignee { firstName lastName } score properties { name value } createdBy { firstName lastName } createdAt'),
		// tslint:disable-next-line:max-line-length
		Sample: new BaseQueries('Sample', 'id name createdBy { firstName lastName } assignee { firstName lastName } supplier { name } createdAt _version'),
		// tslint:disable-next-line:max-line-length
		Task: new BaseQueries('Task', 'id name _version dueDate product { name } createdBy { firstName lastName } assignee { firstName lastName } supplier { name } createdAt'),
		Tag: new BaseQueries('Tag'),
		Team: new BaseQueries('Team', 'id name'),
		TeamUser: new BaseQueries('TeamUser', 'team { id name } user { firstName lastName email } role'),
		User: new BaseQueries('User', `id firstName lastName`),
		Venue: new BaseQueries('Venue'),
		Vote: new BaseQueries('Vote', 'id message rating nodeId _version createdBy { id }'),
		WorkflowStatus: new StatusQueries(),
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

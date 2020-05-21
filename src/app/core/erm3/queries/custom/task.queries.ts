import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class TaskQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		_version
		dueDate
		product { name }
		supplier { name }
		status {
			${StatusQueries.defaultFields}
		}
		createdBy { firstName lastName }
		assignee { firstName lastName }
		createdAt
	`;

	constructor() {
		super('Task', TaskQueries.defaultFields);
	}
}
//

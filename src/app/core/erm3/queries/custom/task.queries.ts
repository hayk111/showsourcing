import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class TaskQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		dueDate
		product { name }
		supplier { name }
		status { name }
		createdBy { firstName lastName }
		assignee { firstName lastName }
		createdAt
	`;

	constructor() {
		super('Task', TaskQueries.defaultFields);
	}
}
//

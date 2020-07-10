import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class ProjectQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		description
		dueDate
		assignee { firstName lastName }
		createdBy { firstName lastName }
		createdAt
		lastUpdatedBy { firstName lastName }
    lastUpdatedAt
	`;

	constructor() {
		super('Project', ProjectQueries.defaultFields);
	}
}

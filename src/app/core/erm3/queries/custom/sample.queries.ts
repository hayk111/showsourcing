import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class SampleQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		status {
			${StatusQueries.defaultFields}
		}
		product { name }
		supplier { name }
		createdBy { firstName lastName }
		assignee { firstName lastName }
		createdAt
	`;

	constructor() {
		super('Sample', SampleQueries.defaultFields);
	}
}

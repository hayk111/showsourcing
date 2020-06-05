import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class SupplierQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		favorite
		status {
			${StatusQueries.defaultFields}
		}
		properties { name value }
		assignee { firstName lastName }
		createdBy { firstName lastName }
		createdAt
	`;

	constructor() {
		super('Supplier', SupplierQueries.defaultFields);
	}
}


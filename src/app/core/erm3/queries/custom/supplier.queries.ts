import { BaseQueries } from '../base.queries';
import { StatusQueries } from './status.queries';

export class SupplierQueries extends BaseQueries {
	static defaultFields = `
		id
		name
		_version
		favorite
		status {
			${StatusQueries.defaultFields}
		}
		assignee { firstName lastName }
		supplier { name }
		createdAt
		_version
	`;

	constructor() {
		super('Supplier', SupplierQueries.defaultFields);
	}
}


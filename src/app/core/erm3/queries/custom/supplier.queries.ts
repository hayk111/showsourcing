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
		properties { name value }
		assignee { firstName lastName }
		createdAt
		_version
	`;

	constructor() {
		super('Supplier', SupplierQueries.defaultFields);
	}
}


import { BaseQueries } from '../base.queries';

export class StatusQueries extends BaseQueries {
	constructor() {
		super('WorkflowStatus', StatusQueries.defaultFields);
	}
	static defaultFields = `
			id
			name
			inWorkflow
			step
			final
			type
			_version
	`;
			// category
}

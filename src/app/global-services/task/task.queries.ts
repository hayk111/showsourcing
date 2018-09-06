import gql from 'graphql-tag';
import { GlobalQueries } from '~global-services/_global/global-queries.class';

export abstract class TaskQueries extends GlobalQueries {

	static readonly type = `type { name }`;
	static readonly supplier = `supplier { name, logoImage { fileName }}`;
	static readonly product = `product { name, images { fileName }}`;
	static readonly assignee = `assignee { firstName, lastName, avatar { fileName } }`;

	static one = `
		${TaskQueries.type}
		name
		code
		done
		dueDate
		completionDate
		${TaskQueries.product}
		${TaskQueries.supplier}
		${TaskQueries.assignee}
		description
	`;

	static many = `
		${TaskQueries.type}
		name
		code
		done
		dueDate
		completionDate
		${TaskQueries.product}
		${TaskQueries.supplier}
		${TaskQueries.assignee}
		description
	`;
}

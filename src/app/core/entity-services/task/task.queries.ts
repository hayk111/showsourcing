import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class TaskQueries extends GlobalQueries {

	static readonly type = `type { id, name }`;
	static readonly supplier = `supplier { id, name, logoImage { id, fileName, urls { id, url} }}`;
	static readonly product = `product { id, name, images { id, fileName, urls { id, url} }}`;
	static readonly assignee = `assignee { id, firstName, lastName, avatar { id, fileName, urls { id, url} } }`;
	static readonly createdBy = `createdBy { id, lastName, firstName, avatar { id, fileName, urls { id, url} } }`;
	static readonly comments = `comments { id, text, ${TaskQueries.createdBy}, creationDate }`;

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
		${TaskQueries.comments}
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

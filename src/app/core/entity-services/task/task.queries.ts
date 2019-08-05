import gql from 'graphql-tag';
import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class TaskQueries extends GlobalQueries {

	static readonly type = `type { id, name }`;
	static readonly supplier = `supplier { id, name, logoImage { id, fileName, urls { id, url} }}`;
	static readonly product = `product { id, name, images { id, fileName, urls { id, url} }}`;
	static readonly assignee = `assignee { id, firstName, lastName, avatar { id, fileName, urls { id, url} } }`;
	static readonly user = (name) => `${name} { id, lastName, firstName, avatar { id, fileName, urls { id, url} } }`;
	static readonly comments = `comments { id, text, ${TaskQueries.user('createdBy')}, creationDate }`;
	static readonly extendedFields = `extendedFields { id, value, definition { id, label, type, order }}`;

	static one = `
		${TaskQueries.type}
		name
		code
		done
		dueDate
		completionDate
		creationDate
		lastUpdatedDate
		${TaskQueries.user('createdBy')}
		${TaskQueries.user('lastUpdatedBy')}
		${TaskQueries.product}
		${TaskQueries.supplier}
		${TaskQueries.assignee}
		${TaskQueries.comments}
		${TaskQueries.extendedFields}
		description
	`;

	static many = `
		${TaskQueries.type}
		name
		code
		done
		dueDate
		completionDate
		creationDate
		lastUpdatedDate
		${TaskQueries.user('createdBy')}
		${TaskQueries.user('lastUpdatedBy')}
		${TaskQueries.product}
		${TaskQueries.supplier}
		${TaskQueries.assignee}
		${TaskQueries.extendedFields}
		description
	`;
}

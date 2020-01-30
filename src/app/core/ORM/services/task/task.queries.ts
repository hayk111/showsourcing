import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export abstract class TaskQueries extends GlobalQueries {

	static readonly type = `type { id, name }`;
	static readonly supplier = `supplier { id, name, logoImage { id, fileName, urls { id, url} }}`;
	static readonly product = `product { id, name, images { id, fileName, urls { id, url} }}`;
	static readonly assignee = `assignee { id, firstName, lastName, avatar { id, fileName, urls { id, url} } }`;
	static readonly user = (name) => `${name} { id, lastName, firstName, avatar { id, fileName, urls { id, url} } }`;
	static readonly comments = `comments {
		id, text, creationDate, lastUpdatedDate, deleted,
		${TaskQueries.user('createdBy')},
		${TaskQueries.user('lastUpdatedBy')}
	}`;
	static readonly definition = (name: string) => `${name} { id, label, type, order, metadata }`;
	static readonly extendedFields = `extendedFields {
		id, value,
		selectorValues { id, value, ${TaskQueries.definition('fieldDefinition')} },
		${TaskQueries.definition('definition')}
	}`;

	static one = `
		${TaskQueries.type}
		archived
		name
		reference
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
		archived
		name
		reference
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
		deleted
	`;
}

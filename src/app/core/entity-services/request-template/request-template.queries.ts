import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestTemplateQueries extends GlobalQueries {

	static readonly requestedFields = `requestedFields { id, label, type }`;

	// TODO Backend remove requested fields and add fields
	static readonly one = `
		name
		targetedEntity
		${RequestTemplateQueries.requestedFields}
	`;

	static readonly many = `
		name
		targetedEntity
		${RequestTemplateQueries.requestedFields}
	`;

	static readonly all = `
		name
		targetedEntity
		${RequestTemplateQueries.requestedFields}
	`;

}


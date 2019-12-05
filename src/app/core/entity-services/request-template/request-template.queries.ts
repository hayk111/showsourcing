import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestTemplateQueries extends GlobalQueries {

	static readonly requestedFields = `requestedFields { id, label, type }`;
	static readonly fields = `fields { id, defaultValue, fixedValue, definition { id, label, type, order, metadata }}`;

	// TODO Backend remove requested fields and add fields
	static readonly one = `
		name
		targetedEntity
		${RequestTemplateQueries.fields}
	`;

	static readonly many = `
		name
		targetedEntity
		${RequestTemplateQueries.fields}
		`;

	static readonly all = `
		name
		targetedEntity
		${RequestTemplateQueries.fields}
		`;

}


import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestFieldDefinitionQueries extends GlobalQueries {

	static readonly one = `
		label
		type
	`;

	static readonly many = `
		label
		type
	`;

	static readonly all = `
		label
		type
	`;

}


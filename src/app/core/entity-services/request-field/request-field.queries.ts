import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class RequestFieldQueries extends GlobalQueries {

	static readonly definition = `definition { id, label, type }`;

	static readonly one = `
		${RequestFieldQueries.definition}
		value
	`;

	static readonly many = `
		${RequestFieldQueries.definition}
		value
	`;

}


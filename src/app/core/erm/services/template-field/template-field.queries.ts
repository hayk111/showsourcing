import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';

export abstract class TemplateFieldQueries extends GlobalQueries {

	static readonly definition = `definition { id, label, type, order, metadata }`;

	static readonly one = `
		defaultValue, fixedValue, ${TemplateFieldQueries.definition}
	`;

	static readonly many = `
		defaultValue, fixedValue, ${TemplateFieldQueries.definition}
	`;

}

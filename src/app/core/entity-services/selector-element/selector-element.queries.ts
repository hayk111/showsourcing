import { GlobalQueries } from '../_global/global-queries.class';

export class SelectorElementQueries extends GlobalQueries {

	static readonly one = `
		value
		fieldDefinition { id, label, type, order, target, metadata }
	`;

	static readonly many = `
		value
		fieldDefinition { id, label, type, order, target, metadata }
	`;

	static readonly all = `
		value
		fieldDefinition { id, label, type, order, target, metadata }
	`;

}

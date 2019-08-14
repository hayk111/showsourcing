import { GlobalQueries } from '../_global/global-queries.class';

export class SelectorElementQueries extends GlobalQueries {

	static readonly one = `
		value
		fieldDefinition
	`;

	static readonly many = `
		value
		fieldDefinition
	`;

}

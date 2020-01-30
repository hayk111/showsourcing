import { GlobalQueries } from '~core/orm/services/_global/global-queries.class';

export class CurrencyQueries extends GlobalQueries {

	static readonly one = `
		name
		symbol
	`;

	static readonly many = `
		name
		symbol
	`;

	static readonly all = `
		name
		symbol
	`;
}

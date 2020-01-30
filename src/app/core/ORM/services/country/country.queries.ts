import { GlobalQueries } from '../_global/global-queries.class';

export class CountryQueries extends GlobalQueries {
	static readonly one = `
		fullName
		countryCode
	`;

	static readonly many = `
		fullName
		countryCode
	`;

	static readonly all = `
		fullName
		countryCode
	`;
}

import { GlobalQueries } from '../_global/global-queries.class';

export class CountryQueries extends GlobalQueries {
	static readonly one = `
		fullName
		countyCode
	`;

	static readonly many = `
		fullName
		countyCode
	`;

	static readonly all = `
		fullName
		countyCode
	`;
}

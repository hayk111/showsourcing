import { GlobalQueries } from '../_global/global-queries.class';

export class HarbourQueries extends GlobalQueries {
	static readonly one = `
		name
	`;

	static readonly many = `
		name
	`;
}

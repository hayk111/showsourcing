import { GlobalQueries } from '../_global/global-queries.class';

export class IncoTermQueries extends GlobalQueries {
	static readonly one = `
		id
		name
	`;

	static readonly many = `
		id
		name
	`;
}

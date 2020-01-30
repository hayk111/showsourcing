import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';

export abstract class CompanyQueries extends GlobalQueries {
	static readonly one = `name, ownerUserId`;
	static readonly many = `name, ownerUserId`;
	static readonly all = `name, ownerUserId`;
}

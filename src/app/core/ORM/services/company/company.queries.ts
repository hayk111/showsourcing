import { GlobalQueries } from '~core/ORM/services/_global/global-queries.class';

export abstract class CompanyQueries extends GlobalQueries {
	static readonly one = `name, owner { id, firstName, lastName }`;
	static readonly many = `name, owner { id, firstName, lastName }`;
	static readonly all = `name, owner { id, firstName, lastName }`;
}

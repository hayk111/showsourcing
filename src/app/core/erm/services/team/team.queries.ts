import { GlobalQueries } from '~core/erm/services/_global/global-queries.class';


export class TeamQueries extends GlobalQueries {

	static readonly one = `name`;
	static readonly many = `name`;
	createDefaultSelection = `name`;
	static readonly all = `name`;

}

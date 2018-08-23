import { Sort } from '~shared/table/components/sort.interface';

/** utility class used to manage a selection of items
 */
export class SelectParams {
	/** page used for pagination,
	 * !!!! warning !!!!
	 *
	 * this should stay at 0 if we use infini scroll !
	 */
	page = 0;
	/** query we use to find a specific item */
	query = '';
	/** sorting used */
	sort: Sort = { sortBy: 'creationDate', descending: true };
	/** how much items we request */
	take = 30;

	constructor(config?: SelectParamsConfig) {
		Object.assign(this, config);
	}


	toApolloVariables() {
		// the selectMany here is a subscription to some data on the server
		// putting those in variables form
		return {
			query: this.query,
			skip: this.page * this.take,
			take: this.take,
			...this.sort
		};
	}
}

export interface SelectParamsConfig {
	page?: number;
	query?: string;
	sort?: Sort;
	take?: number;
}


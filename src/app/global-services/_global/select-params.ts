import { Sort } from '~shared/table/components/sort.interface';

/** utility class used to manage a selection of items
 */
export class SelectParams {
	/** page used for pagination,
	 * !!!! warning !!!!
	 *
	 * this should stay at 0 if we use infini scroll !
	 */
	private _page = 0;
	/** query we use to find a specific item */
	private _query = '';
	/** sorting used */
	private _sort: Sort = { sortBy: 'creationDate', sortOrder: 'DESC' };
	/** how much items we request */
	private _take = 30;
	/** filters to apply to the request */
	private _filters = [];

	constructor(config?: SelectParamsConfig) {
		Object.assign(this, config);
	}


	toApolloVariables() {
		// the selectMany here is a subscription to some data on the server
		// putting those in variables form
		const sortBy = this.sort.sortBy;
		const descending = this.sort.sortOrder === 'ASC';
		return {
			query: this.query,
			skip: this.page * this.take,
			take: this.take,
			sortBy,
			descending,
		};
	}
}

export interface SelectParamsConfig {
	page?: number;
	query?: string;
	sort?: Sort;
	take?: number;
}


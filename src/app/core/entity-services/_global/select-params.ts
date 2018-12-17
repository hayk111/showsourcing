/** utility class used to manage a selection of items */
export class SelectParams {
	/** used for pagination,
	 * !!!! warning !!!!
	 *
	 * this should stay at 0 if we use infini scroll !
	 */
	skip = 0;
	/** query we use to find a specific item */
	query = '';
	/** sorting used */
	sortBy: 'creationDate';
	/** whether it's ASC or DESC */
	descending = true;
	/** how much items we request */
	take = 15;

	constructor(config?: SelectParamsConfig) {
		Object.assign(this, config);
	}

}

/** configuration for making a query */
export interface SelectParamsConfig {
	skip?: number;
	take?: number;
	query?: string;
	sortBy?: string;
	descending?: boolean;
}



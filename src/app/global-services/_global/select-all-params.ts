import { Sort } from '~shared/table/components/sort.interface';

/** utility class used to manage queryall selections
 */
export class SelectAllParams {

	/** query we use to find a specific item */
	query = '';
	/** sorting used */
	sortBy: 'creationDate';
	/** whether it's ASC or DESC */
	descending: true;

	constructor(config?: SelectAllParamsConfig) {
		Object.assign(this, config);
	}

}

export interface SelectAllParamsConfig {
	query?: string;
	sortBy?: string;
	descending?: boolean;
}



import { Sort } from '~shared/table/components/sort.interface';

export class ListParams {
	query = '';
	sort: Sort = { sortBy: 'creationDate', sortOrder: 'DESC' };

	constructor(config?: SelectParamsConfig) {
		Object.assign(this, config);
	}

	toWrapperOptions(gql: any) {
		// the selectMany here is a subscription to some data on the server
		// putting those in variables form
		const sortBy = this.sort.sortBy;
		const descending = this.sort.sortOrder === 'ASC';
		const options = {
			gql: gql,
			sortBy,
			descending,
			query: this.query
		};
		return options;
	}
}

export interface SelectParamsConfig {
	query?: string;
	sort?: Sort;
}


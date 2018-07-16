import { Sort } from '~shared/table/components/sort.interface';

export class SelectParams {
	page = 0;
	query = '';
	sort: Sort = { sortBy: 'creationDate', sortOrder: 'DESC' };
	take = 30;

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
			skip: this.page * this.take,
			take: this.take,
			sortBy,
			descending,
			query: this.query
		};
		return options;
	}
}

export interface SelectParamsConfig {
	page?: number;
	query?: string;
	sort?: Sort;
	take?: number;
}


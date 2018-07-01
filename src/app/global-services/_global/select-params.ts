import { Sort } from '~shared/table/components/sort.interface';

export class SelectParams {
	page = 0;
	query = '';
	sort: Sort = { sortBy: 'creationDate', sortOrder: 'DESC' };
	take = 10;

	constructor(config?: SelectParamsConfig) {
		Object.assign(this, config);
	}
}

export interface SelectParamsConfig {
	page?: number;
	query?: string;
	sort?: Sort;
	take?: number;
}


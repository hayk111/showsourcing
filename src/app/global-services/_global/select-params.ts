import { Sort } from '~shared/table/components/sort.interface';

export interface SelectParams {
	page?: number;
	query?: string;
	sort?: Sort;
}
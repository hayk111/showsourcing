import { Filter, FilterType } from '../models';
import { FilterList } from './filter-list.class';

describe('FilterList', () => {
	let filterList: FilterList;
	let initialFilters: Filter[];
	let searchedFields: string[];
	let constPredicate: string;

	beforeEach(() => {
		filterList = new FilterList();
		initialFilters = [];
		searchedFields = [];
		constPredicate = '';
	});


	it('should return correct values (expect for asPredicate)', () => {
		initialFilters = [{ type: FilterType.ARCHIVED, value: true }, { type: FilterType.DELETED, value: true }];
		const expectResult = initialFilters.map(e => `(${e.type} == ${e.value})`).join(' AND ');
		filterList = new FilterList(initialFilters);
		expect(filterList.asPredicate()).toEqual(`(${expectResult})`);
	});
});

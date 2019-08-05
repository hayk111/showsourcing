import { FilterByType, FilterList } from './filter-list.class';
import { Filter } from '../models';
import { FilterType } from '../models';
import { FiltersModule } from '../filters.module';
import { FiltersComponent } from '../components/filters/filters.component';

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
		console.log('expectResult', [expectResult]);
		filterList = new FilterList(initialFilters);
		expect(filterList.asPredicate()).toEqual(`(${expectResult})`);
	});
});
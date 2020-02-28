import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { FilterType } from './filter-type.enum';
import { FilterService } from './filter.service';

describe('Filter Service', () => {
	let filterSrv: FilterService;
	const startFilters = [
		{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
		{ type: FilterType.CATEGORY, value: 'id-category-1' },
	];
	const testFilters =	[
		{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
		{ type: FilterType.CATEGORY, value: 'id-category-2' }
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FilterService]
		});
		filterSrv = TestBed.get(FilterService);
		filterSrv.setup(startFilters);
		spyOn(filterSrv, 'setFilters').and.callThrough();
	});


	it('should be instanciated', () => {
		expect(filterSrv).toBeTruthy();
	});

	it('should set the filters', () => {
		filterSrv.setFilters(testFilters);
		expect(filterSrv.filters).toEqual(testFilters);
	});

	it('should return whether the service has a specific filter value for a given type', () => {
		filterSrv.setFilters(startFilters);
		expect(filterSrv.hasFilterValue(startFilters[0].type, startFilters[0].value)).toEqual(true);
		expect(filterSrv.hasFilterValue(FilterType.SUPPLIER, 'id-not-in-filters')).toEqual(false);
		expect(filterSrv.hasFilterValue(FilterType.TAG, 'id-tag-0')).toEqual(false);
	});

	it('should get the filters for a specific type', () => {
		filterSrv.setup(startFilters);
		expect(filterSrv.getFiltersForType(FilterType.SUPPLIER))
			.toEqual(startFilters.filter(fltr => fltr.type === FilterType.SUPPLIER));
	});


	it('should be able to add a filter', () => {
		filterSrv.addFilter(testFilters[0]);
		expect(filterSrv.setFilters).toHaveBeenCalledWith([...startFilters, testFilters[0] ]);
	});

	it('should remove filter', () => {
		filterSrv.removeFilter(startFilters[0]);
		expect(filterSrv.setFilters).toHaveBeenCalledWith([ ...startFilters.slice(1)]);
	});

	it('should remove filter for types', () => {
		filterSrv.removeFilterType(FilterType.SUPPLIER);
		expect(filterSrv.setFilters).toHaveBeenCalledWith(
			startFilters.filter(f => f.type !== FilterType.SUPPLIER)
		);
	});

	it('should reset filters', () => {
		filterSrv.setFilters([...startFilters, ...testFilters]);
		filterSrv.reset();
		expect(filterSrv.setFilters).toHaveBeenCalledWith(startFilters);
	});

	it('should add search', () => {
		const searchStr = 'test';
		filterSrv.setSearch(searchStr);
		expect(filterSrv.filters).toContain({ type: FilterType.SEARCH, value: searchStr });
	});

	it('should tell us when the value changes', (done) => {
		filterSrv.valueChanges$.pipe(
			// skip the replay
			skip(1)
		).subscribe(({ filters }) => {
			expect(filters).toEqual([...startFilters, testFilters[0]]);
			done();
		});
		filterSrv.addFilter(testFilters[0]);
	});

	it('should give the filter amount added after the start filters', () => {
		filterSrv.setFilters([...startFilters, ...testFilters]);
		expect(filterSrv.getFilterAmount()).toEqual(testFilters.length);
	});

	it('should return whether the service has a specific filter type', () => {
		expect(filterSrv.hasFilterType(FilterType.SUPPLIER)).toEqual(true);
		expect(filterSrv.hasFilterType(FilterType.TAG)).toEqual(false);
	});

});

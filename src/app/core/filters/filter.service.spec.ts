import { FilterService } from './filter.service';
import { TestBed } from '@angular/core/testing';
import { FilterType } from './filter-type.enum';
import { FilterConverter } from './filter-converter.class';

describe('Filter Service', () => {
	let filterSrv: FilterService;
	const converter = new FilterConverter;
	const startFilters = [
		{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
		{ type: FilterType.CATEGORY, value: 'id-category-1' },
	];
	const testFilters =	[
		{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
		{ type: FilterType.CATEGORY, value: 'id-category-2' }
	];
	const concat = [...startFilters, ...testFilters ];

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

	it('should set data structures when calling setFilters', () => {
		filterSrv.setFilters(testFilters);
		expect(filterSrv.filters).toEqual(testFilters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(testFilters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(testFilters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(testFilters));
	});

	it('should be able to add a filter', () => {
		filterSrv.addFilter(testFilters[0]);
		expect(filterSrv.setFilters).toHaveBeenCalledWith([...startFilters, testFilters[0] ]);
	});


	it('should add many filter and have the other data structure generated', () => {
		filterSrv.addFilters(testFilters);
		expect(filterSrv.setFilters).toHaveBeenCalledWith(concat);
	});

	it('should remove filter and generate data structures', () => {
		filterSrv.removeFilter(startFilters[0]);
		expect(filterSrv.setFilters).toHaveBeenCalledWith([ ...startFilters.slice(1)]);
	});

	it('should remove filter for types and generate data structures', () => {
		filterSrv.removeFilterType(FilterType.SUPPLIER);
		expect(filterSrv.setFilters).toHaveBeenCalledWith(
			startFilters.filter(f => f.type !== FilterType.SUPPLIER)
		);
	});

	it('should reset filters', () => {

		filterSrv.addFilters(testFilters);
		expect(filterSrv.setFilters).toHaveBeenCalledWith(concat);
		filterSrv.reset();
		expect(filterSrv.setFilters).toHaveBeenCalledWith(startFilters);

	});

	it('should give the filter amount added after the start filters', () => {
		filterSrv.addFilters(testFilters);
		expect(filterSrv.getFilterAmount()).toEqual(2);
	});

	it('should return whether the service has a specific filter type', () => {
		expect(filterSrv.hasFilterType(FilterType.SUPPLIER)).toEqual(true);
		expect(filterSrv.hasFilterType(FilterType.TAG)).toEqual(false);
	});

	it('should return whether the service has a specific filter value for a given type', () => {
		expect(filterSrv.hasFilterValue(startFilters[0].type, startFilters[0].value)).toEqual(true);
	});

});

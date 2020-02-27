import { FilterService } from './filter.service';
import { TestBed } from '@angular/core/testing';
import { FilterType } from './filter-type.enum';
import { FilterConverter } from './filter-converter.class';

describe('Filter Service', () => {
	let filterSrv: FilterService;
	const converter = new FilterConverter;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FilterService]
		});
		filterSrv = TestBed.get(FilterService);
		filterSrv.setup();
	});

	it('should be instanciated', () => {
		expect(filterSrv).toBeTruthy();
	});

	it('should be able to add a filter', () => {
		const filter = { type: FilterType.CATEGORY, value: 'id-cat' };
		filterSrv.addFilter(filter);
		expect(filterSrv.filters).toEqual([filter]);
	});

	it('should add one filter and have the other data model generated', () => {
		const filters = [
			{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
		];
		filterSrv.addFilter(filters[0]);
		expect(filterSrv.filters).toEqual(filters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(filters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(filters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(filters));
	});

	it('should add many filter and have the other data structure generated', () => {
		const filters = [
			{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
			{ type: FilterType.CATEGORY, value: 'id-category-2' }
		];
		filterSrv.addFilters(filters);
		expect(filterSrv.filters).toEqual(filters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(filters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(filters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(filters));
	});

	it('should remove filter and generate data structures', () => {
		let filters = [
			{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
			{ type: FilterType.CATEGORY, value: 'id-category-2' }
		];
		filterSrv.addFilters(filters);
		expect(filterSrv.filters).toEqual(filters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(filters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(filters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(filters));
		filterSrv.removeFilter(filters[0]);
		filters = filters.slice(0);
		expect(filterSrv.filters).toEqual(filters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(filters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(filters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(filters));
	});

	it('should remove filter for types and generate data structures', () => {
		let filters = [
			{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
			{ type: FilterType.CATEGORY, value: 'id-category-2' }
		];
		filterSrv.addFilters(filters);
		expect(filterSrv.filters).toEqual(filters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(filters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(filters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(filters));
		filterSrv.removeFilterType(FilterType.SUPPLIER);
		filters = filters.filter(f => f.type !== FilterType.SUPPLIER);
		expect(filterSrv.filters).toEqual(filters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(filters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(filters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(filters));
	});

	it('should reset filters', () => {

		const startFilters = [
			{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
		];
		const filters = [
			{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
			{ type: FilterType.CATEGORY, value: 'id-category-2' }
		];
		const concat = [ ...startFilters, ...filters];
		filterSrv.setup(startFilters);
		filterSrv.addFilters(filters);
		expect(filterSrv.filters).toEqual(concat);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(concat));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(concat));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(concat));

		filterSrv.reset();
		expect(filterSrv.filters).toEqual(startFilters);
		expect(filterSrv.queryArg).toEqual(converter.filtersToQueryArg(startFilters));
		expect(filterSrv.filtersByType).toEqual(converter.filtersByType(startFilters));
		expect(filterSrv.valuesByType).toEqual(converter.valuesByType(startFilters));
	});

	// it('should give the filter amount added after the start filters', () => {
	// 	const startFilters = [
	// 		{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
	// 		{ type: FilterType.CATEGORY, value: 'id-category-1' },
	// 	];
	// 	const filters = [
	// 		{ type: FilterType.SUPPLIER, value: 'id-supplier-2' },
	// 		{ type: FilterType.CATEGORY, value: 'id-category-2' }
	// 	];
	// 	const concat = [ ...startFilters, ...filters];
	// 	filterSrv.setup(startFilters);
	// 	filterSrv.addFilters(filters);
	// 	expect(filterSrv.getFilterAmount()).toEqual(2);
	// });

});

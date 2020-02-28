import { FilterConverter } from './filter-converter.class';
import { FilterType } from './filter-type.enum';
import { Filter } from './filter.class';

describe('Filter Converter', () => {
	let converter: FilterConverter;
	let testFilters: Filter[];

	beforeEach(() => {
		converter = new FilterConverter();
		testFilters = [
			{ type: FilterType.CATEGORY, value: 'id-category-0' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
			{ type: FilterType.SEARCH, value: 'test' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-0' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
		];
	});

	it('should convert Array<Filter> to valuesByType Map<FilterType, Set<any>>', () => {
		expect(converter.valuesByType(testFilters)).toEqual(
			new Map([
				[FilterType.CATEGORY, new Set(['id-category-0', 'id-category-1'])],
				[FilterType.SEARCH, new Set(['test'])],
				[FilterType.SUPPLIER, new Set(['id-supplier-0', 'id-supplier-1'])]
			]
		));
	});

	it('should convert Array<Filter> to filtersByType Map<FilterType, Filter[]>', () => {
		expect(converter.filtersByType(testFilters)).toEqual(
			new Map([
				[FilterType.CATEGORY, testFilters.filter(f => f.type === FilterType.CATEGORY)],
				[FilterType.SEARCH, testFilters.filter(f => f.type === FilterType.SEARCH)],
				[FilterType.SUPPLIER, testFilters.filter(f => f.type === FilterType.SUPPLIER)]
			]
		));
	});

	it('should return empty object when no filters', () => {
		expect(converter.filtersToQueryArg([])).toEqual({ });
	});

	it('should return just the filter when there is only one', () => {
		const filters = [{ type: FilterType.SUPPLIER, value: 'id-supplier-0' }];
		expect(converter.filtersToQueryArg(filters)).toEqual(
			{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-0' } } }
		);
	});

	it('should return and when only one of each type', () => {
		const filters = [
			{ type: FilterType.CATEGORY, value: 'id-category-0' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-0' },
		];
		expect(converter.filtersToQueryArg(filters)).toEqual({
			and: [
				{ [FilterType.CATEGORY]: { id: { eq: 'id-category-0' } } },
				{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-0' } } },
			]
		});
	});

	it('should return or when multiple of the same type', () => {
		const filters = [
			{ type: FilterType.CATEGORY, value: 'id-category-0' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
		];
		expect(converter.filtersToQueryArg(filters)).toEqual({
			or: [
				{ [FilterType.CATEGORY]: { id: { eq: 'id-category-0' } } },
				{ [FilterType.CATEGORY]: { id: { eq: 'id-category-1' } } },
			]
		});
	});

	it('should add the search given by searched fields', () => {
		// searchedFields defaults to "name"
		const filters = [{ type: FilterType.SEARCH, value: 'test' } ];
		expect(converter.filtersToQueryArg(filters)).toEqual({ 	name: { match: 'test' } });
		converter = new FilterConverter(['name', 'supplierName']);
		expect(converter.filtersToQueryArg(filters)).toEqual(
			{
				or: [
					{ name: { match: 'test' } },
					{ supplierName: { match: 'test' } },
				]
			}
		);
	});

	it('should return the right complex query', () => {
		const filters = [
			{ type: FilterType.CATEGORY, value: 'id-category-0' },
			{ type: FilterType.CATEGORY, value: 'id-category-1' },
			{ type: FilterType.SEARCH, value: 'test' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-0' },
			{ type: FilterType.SUPPLIER, value: 'id-supplier-1' },
		];
		converter = new FilterConverter(['name', 'supplierName']);
		expect(converter.filtersToQueryArg(filters)).toEqual({
			and: [
				{
					or: [
						{ [FilterType.CATEGORY]: { id: { eq: 'id-category-0' } } },
						{ [FilterType.CATEGORY]: { id: { eq: 'id-category-1' } } },
					]
				},
				{
					or: [
						{ name: { match: 'test' } },
						{ supplierName: { match: 'test' } },
					]
				},
				{
					or: [
						{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-0' } } },
						{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-1' } } },
					]
				},
			]
		});
	});

});

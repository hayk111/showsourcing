import { Filter, FilterType } from '../models';
import { FilterList } from './filter-list.class';

describe('FilterList', () => {
	let filterList: FilterList;
	let startFilters: Filter[];
	let searchedFields: string[];

	beforeEach(() => {
		startFilters = [];
		searchedFields = [];
		filterList = new FilterList(startFilters, searchedFields);
	});

	// test predicate without filters
	it('should be instantiated correctely (without params)', () => {
		expect(filterList.asPredicate()).toEqual({ and: [{ or: [] }] });
	});

	// test instance with default filters
	it('should be instantiated correctely (with param filter)', () => {
		const newFilterList = new FilterList(
			[{ type: FilterType.SUPPLIER, value: 'my-supplier' }],
			[]
		);
		expect(newFilterList.asPredicate()).toEqual({
			and: [{ or: [{ [FilterType.SUPPLIER]: { id: { eq: 'my-supplier' } } }] }]
		});
	});

	// test addFilter function
	it('should be able to add a filter', () => {
		filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-cat' });
		expect(filterList.asFilters()).toEqual([
			{ type: FilterType.CATEGORY, value: 'id-cat' }
		]);
	});

	// test simple category selected
	it('should work with one category selected', () => {
		filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-cat' });
		expect(filterList.asPredicate()).toEqual({
			and: [{ or: [{ [FilterType.CATEGORY]: { id: { eq: 'id-cat' } } }] }]
		});
	});

	// select 2 suppliers and 2 categories
	it('should work with many filters selected from many types', () => {
		filterList.addFilter({ type: FilterType.SUPPLIER, value: 'id-supplier-1' });
		filterList.addFilter({ type: FilterType.SUPPLIER, value: 'id-supplier-2' });
		filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-category-1' });
		filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-category-2' });
		expect(filterList.asPredicate()).toEqual({
			and: [
				{
					or: [
						{ [FilterType.CATEGORY]: { id: { eq: 'id-category-1' } } },
						{ [FilterType.CATEGORY]: { id: { eq: 'id-category-2' } } }
					]
				},
				{
					or: [
						{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-1' } } },
						{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-2' } } }
					]
				}
			]
		});
	});

	// test simple search string
	it('should work with a simple search string', () => {
		filterList.searchedFields = ['name', 'supplierName'];
		filterList.setSearch('name or supplier contains this');
		expect(filterList.asPredicate()).toEqual({
			and: [
				{
					or: [
						{
							name: { match: 'name or supplier contains this' }
						},
						{
							supplierName: { match: 'name or supplier contains this' }
						}
					]
				}
			]
		});
	});

	// test to get the filter from the type map
	it('should get the filter byType', () => {
		filterList.addFilter({type: FilterType.ASSIGNEE, value: 'test-id'});
		const hasFilterByType = filterList.asByType().get(FilterType.ASSIGNEE).has('test-id');
		expect(hasFilterByType).toBe(true);
	});
});

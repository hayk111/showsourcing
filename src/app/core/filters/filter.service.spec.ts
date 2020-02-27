import { FilterService } from './filter.service';
import { TestBed } from '@angular/core/testing';
import { FilterType } from './filter-type.enum';

fdescribe('Filter Service', () => {
	let filterSrv: FilterService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FilterService]
		});
		filterSrv = TestBed.get(FilterService);
	});

	it('should be instanciated', () => {
		expect(filterSrv).toBeTruthy();
	});


	// test predicate without filters
	it('should return empty object when no filters', () => {
		filterSrv.setup();
		expect(filterSrv.queryArg).toEqual({ });
		filterSrv.setup([], []);
		expect(filterSrv.queryArg).toEqual({ });
	});

	// // test instance with default filters
	it('should return just the filter when there is only one', () => {
		filterSrv.setup([
			{ type: FilterType.SUPPLIER, value: 'id-supplier-0' }
		]);
		expect(filterSrv.queryArg).toEqual(
			{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-0' } } }
		);
	});

	// // test instance with default filters
	it('should return the correct query arg when multiple filters (same type = or, different = and)', () => {
		filterSrv.setup([
			{ type: FilterType.SUPPLIER, value: 'id-supplier-0' },
			// { type: FilterType.SUPPLIER, value: 'id-supplier-1' },
			{ type: FilterType.CATEGORY, value: 'id-category-0' }
		]);
		expect(filterSrv.queryArg).toEqual({
			and: [
				{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-0' } } },
				{ [FilterType.CATEGORY]: { id: { eq: 'id-category-0' } } }
			]
		});
	});

	// // test addFilter function
	// it('should be able to add a filter', () => {
	// 	filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-cat' });
	// 	expect(filterList.asFilters()).toEqual([
	// 		{ type: FilterType.CATEGORY, value: 'id-cat' }
	// 	]);
	// });

	// // test simple category selected
	// it('should work with one category selected', () => {
	// 	filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-cat' });
	// 	expect(filterList.asPredicate()).toEqual({
	// 		and: [{ or: [{ [FilterType.CATEGORY]: { id: { eq: 'id-cat' } } }] }]
	// 	});
	// });

	// // select 2 suppliers and 2 categories
	// it('should work with many filters selected from many types', () => {
	// 	filterList.addFilter({ type: FilterType.SUPPLIER, value: 'id-supplier-1' });
	// 	filterList.addFilter({ type: FilterType.SUPPLIER, value: 'id-supplier-2' });
	// 	filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-category-1' });
	// 	filterList.addFilter({ type: FilterType.CATEGORY, value: 'id-category-2' });
	// 	expect(filterList.asPredicate()).toEqual({
	// 		and: [
	// 			{
	// 				or: [
	// 					{ [FilterType.CATEGORY]: { id: { eq: 'id-category-1' } } },
	// 					{ [FilterType.CATEGORY]: { id: { eq: 'id-category-2' } } }
	// 				]
	// 			},
	// 			{
	// 				or: [
	// 					{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-1' } } },
	// 					{ [FilterType.SUPPLIER]: { id: { eq: 'id-supplier-2' } } }
	// 				]
	// 			}
	// 		]
	// 	});
	// });

	// // test simple search string
	// it('should work with a simple search string', () => {
	// 	filterList.searchedFields = ['name', 'supplierName'];
	// 	filterList.setSearch('name or supplier contains this');
	// 	expect(filterList.asPredicate()).toEqual({
	// 		and: [
	// 			{
	// 				or: [
	// 					{
	// 						name: { match: 'name or supplier contains this' }
	// 					},
	// 					{
	// 						supplierName: { match: 'name or supplier contains this' }
	// 					}
	// 				]
	// 			}
	// 		]
	// 	});
	// });

	// // test to get the filter from the type map
	// it('should get the filter byType', () => {
	// 	filterList.addFilter({type: FilterType.ASSIGNEE, value: 'test-id'});
	// 	const hasFilterByType = filterList.asByType().get(FilterType.ASSIGNEE).has('test-id');
	// 	expect(hasFilterByType).toBe(true);
	// });
});

import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Product, Project } from '~models';

import { TagService, CategoryService, SupplierService, EventService } from '~global-services';
import { ERM, EntityMetadata } from '~models';
import { FilterService } from '~shared/filters';
import { SelectParams } from '~global-services/_global/select-params';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(protected tagSrv: TagService,
		protected categorySrv: CategoryService,
		protected supplierSrv: SupplierService,
		protected eventSrv: EventService) {
	}

	searchFilterElements(str: string, filterSrv: FilterService, erm: EntityMetadata) {
		if (erm === ERM.PRODUCT) {
			return this.searchFilterElementsWithAll(str, filterSrv);
		} else {
			return this.searchFilterElementsWithTagAndCategory(str, filterSrv);
		}
	}

	searchFilterElementsWithAll(str: string, filterSrv: FilterService) {
		return zip(
			this.tagSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.categorySrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.supplierSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.eventSrv.selectMany(
				of(new SelectParams({ query: `alias CONTAINS "${str}"` }))
			).pipe(first()),
			filterSrv.filters$.pipe(first())
		).pipe(
			map(results => {
				const [tags, categories, suppliers, events, filters] = results;
				const elements = [];
				elements.push(...tags.map(tag => Object.assign({}, tag, { type: 'tag', checked: this.isFilter(filters, tag, 'tag') })));
				elements.push(...categories.map(category => Object.assign(
					{}, category, { type: 'category', checked: this.isFilter(filters, category, 'category') })));
				elements.push(...suppliers.map(supplier => Object.assign(
					{}, supplier, { type: 'supplier', checked: this.isFilter(filters, supplier, 'supplier') })));
				elements.push(...events.map(event => Object.assign({}, event, { type: 'event', checked: this.isFilter(filters, event, 'event') })));
				return elements;
			})
		);
	}

	searchFilterElementsWithTagAndCategory(str: string, filterSrv: FilterService) {
		return zip(
			this.tagSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			this.categorySrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${str}"` }))
			).pipe(first()),
			filterSrv.filters$.pipe(first())
		).pipe(
			map(results => {
				const [ tags, categories, filters ] = results;
				const elements = [];
				elements.push(...tags.map(tag => Object.assign({}, tag, { type: 'tags', checked: this.isFilter(filters, tag, 'tag') })));
				elements.push(...categories.map(category => Object.assign(
					{}, category, { type: 'category', checked: this.isFilter(filters, category, 'category') })));
				return elements;
			})
		);
	}

	/** Check if an element has an associated filter. */
	isFilter(filters, element, type) {
		return filters.some(filter => filter.value === element.id);
	}

}

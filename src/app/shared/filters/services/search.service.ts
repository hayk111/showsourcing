import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Product, Project } from '~models';

import { TagService, CategoryService, SupplierService, EventService } from '~entity-services';
import { ERM, EntityMetadata } from '~models';
import { FilterList } from '~shared/filters';
import { SelectParams } from '~entity-services/_global/select-params';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(
		protected tagSrv: TagService,
		protected categorySrv: CategoryService,
		protected supplierSrv: SupplierService,
		protected eventSrv: EventService) {
	}

	searchFilterElements(str: string, filterList: FilterList, erm: EntityMetadata) {
		if (erm === ERM.PRODUCT) {
			return this.searchFilterElementsWithAll(str, filterList);
		} else {
			return this.searchFilterElementsWithTagAndCategory(str, filterList);
		}
	}

	searchFilterElementsWithAll(str: string, filterList: FilterList) {
		return zip(
			this.tagSrv.queryMany({ query: `name CONTAINS "${str}"` }).pipe(first()),
			this.categorySrv.queryMany({ query: `name CONTAINS "${str}"` }).pipe(first()),
			this.supplierSrv.queryMany({ query: `name CONTAINS "${str}"` }).pipe(first()),
			this.eventSrv.queryMany({ query: `name CONTAINS "${str}"` }).pipe(first()),
		).pipe(
			map(results => {
				const [tags, categories, suppliers, events] = results;
				const elements = [];
				elements.push(...tags.map(tag => Object.assign({}, tag, { type: 'tag', checked: this.isFilter(filterList, tag, 'tag') })));
				elements.push(...categories.map(category => Object.assign(
					{}, category, { type: 'category', checked: this.isFilter(filterList, category, 'category') })));
				elements.push(...suppliers.map(supplier => Object.assign(
					{}, supplier, { type: 'supplier', checked: this.isFilter(filterList, supplier, 'supplier') })));
				elements.push(...events.map(event => Object.assign({}, event, { type: 'event', checked: this.isFilter(filterList, event, 'event') })));
				return elements;
			})
		);
	}

	searchFilterElementsWithTagAndCategory(str: string, filterList: FilterList) {
		return zip(
			this.tagSrv.queryMany({ query: `name CONTAINS "${str}"` }).pipe(first()),
			this.categorySrv.queryMany({ query: `name CONTAINS "${str}"` }).pipe(first()),
		).pipe(
			map(results => {
				const [tags, categories] = results;
				const elements = [];
				elements.push(...tags.map(tag => Object.assign({}, tag, { type: 'tags', checked: this.isFilter(filterList, tag, 'tag') })));
				elements.push(...categories.map(category => Object.assign(
					{}, category, { type: 'category', checked: this.isFilter(filterList, category, 'category') })));
				return elements;
			})
		);
	}

	/** Check if an element has an associated filter. */
	isFilter(filterList: FilterList, element, type) {
		return filterList.asFilters().some(filter => filter.value === element.id);
	}

}

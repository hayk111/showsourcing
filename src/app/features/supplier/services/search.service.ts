import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Product, Project } from '~models';

import { TagService, CategoryService, SupplierService, EventService } from '~global-services';
import { FilterService } from '~shared/filters';
import { SelectParams } from '~global-services/_global/select-params';

@Injectable()
export class SearchService {

	constructor(protected tagSrv: TagService,
		protected categorySrv: CategoryService,
		protected supplierSrv: SupplierService,
		protected eventSrv: EventService) {
	}

	searchFilterElements(str: string, filterSrv: FilterService) {
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

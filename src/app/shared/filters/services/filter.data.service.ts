import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import { Supplier } from '~models';

import { FilterDataQueries } from './filter.data.queries';
import { SupplierService } from '~shared/global-services/supplier/supplier.service';
import { FilterType } from '~shared/filters/models';

@Injectable()
export class FilterDataService {

	constructor(
		private supplierSrv: SupplierService) { }

	selectEntity(type: FilterType) {
		switch (type) {
			case FilterType.SUPPLIER:
				return this.selectSuppliers();
			case FilterType.EVENT:
				return this.selectEvents();
			case FilterType.CATEGORY:
				return this.selectCategories();
			case FilterType.TAG:
				return this.selectTags();
			case FilterType.PROJECT:
				return this.selectProjects();
			case FilterType.CREATED_BY:
				return this.selectUsers();
			case FilterType.PRODUCT_STATUS:
				return this.selectProductStatuses();
			default: throw Error(`selection for type ${type}, not implemented yet`);
		}

	}

	private selectSuppliers(): Observable<Supplier[]> {
		return this.supplierSrv.selectAll();
	}

	private selectEvents(): Observable<Supplier[]> {
		// TODO: use the global service made by michael
		throw Error('use the global service made by michael')
	}

	private selectCategories(): Observable<Supplier[]> {
		// TODO: use the global service made by michael
		throw Error('use the global service made by michael')
	}

	private selectTags(): Observable<Supplier[]> {
		// TODO: use the global service made by michael
		throw Error('use the global service made by michael')
	}

	private selectProjects(): Observable<Supplier[]> {
		// TODO: use the global service made by michael
		throw Error('use the global service made by michael')
	}

	private selectUsers(): Observable<Supplier[]> {
		// TODO: use the global service made by michael
		throw Error('use the global service made by michael')
	}

	private selectProductStatuses(): Observable<Supplier[]> {
		// TODO: use the global service made by michael
		throw Error('use the global service made by michael')
	}

	// favorite
}

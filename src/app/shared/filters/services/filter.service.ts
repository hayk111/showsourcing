import { Injectable } from '@angular/core';
import { FilterList, Filter } from '~shared/filters';
import { FilterType } from '../models';
import { UserService } from '~core/erm';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	filterList = new FilterList([
		// initial filters
	]);
	constructor(private userSrv: UserService) {}

	resetFilters() {
		throw Error('this service should not be used, use the one from core instead');
	}

	search(str: string): void {
		throw Error('this service should not be used, use the one from core instead');
	}

	addFilter(filter: Filter) {
		throw Error('this service should not be used, use the one from core instead');
	}

	removeFilter(filter: Filter) {
		throw Error('this service should not be used, use the one from core instead');
	}

	removeFilterType(filterType: FilterType) {
		throw Error('this service should not be used, use the one from core instead');
	}

	isFiltering() {
		throw Error('this service should not be used, use the one from core instead');
	}

	get searchValue() {
		throw Error('this service should not be used, use the one from core instead');
	}

	get valueChanges$() {
		return this.filterList.valueChanges$;
	}

	get getFilterAmount() {
		throw Error('this service should not be used, use the one from core instead');
	}

	filterByArchived(shouldAdd: boolean) {
		throw Error('this service should not be used, use the one from core instead');
	}

	filterByAssignedToMe(shouldAdd: boolean) {
		throw Error('this service should not be used, use the one from core instead');
	}

	filterByDone(shouldAdd: boolean) {
		throw Error('this service should not be used, use the one from core instead');
	}

	filterByCreatedByMe(shouldAdd: boolean) {
		throw Error('this service should not be used, use the one from core instead');
	}
}

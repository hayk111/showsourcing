import { Injectable } from '@angular/core';
import { FilterList, Filter } from '~shared/filters';
import { FilterType } from '../models';
import { UserService } from '~core/erm';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	/** filters coming from the filter panel if any. */
	filterList = new FilterList([
		// initial filters
	]);
	constructor(private userSrv: UserService) {}

	resetFilters() {
		this.filterList.reset();
	}

	/** when we want to search through the list we only search the name */
	search(str: string): void {
		this.filterList.setSearch(str);
	}

	/** adds a filters to the list of filters */
	addFilter(filter: Filter) {
		this.filterList.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.filterList.removeFilter(filter);
	}

	removeFilterType(filterType: FilterType) {
		this.filterList.removeFilterType(filterType);
	}

	isFiltering() {
		// when searching or filtering by non initial filters
		return (
			!!this.filterList.search ||
			this.filterList.asFilters().length > this.filterList.initialFilters.length
		);
	}

	get searchValue() {
		return this.filterList.search;
	}

	get getFilterAmount() {
		const filters = this.filterList
			.asFilters()
			.filter(
				fil =>
					!this.filterList.initialFilters.some(
						elem => elem.type === fil.type && elem.value === fil.value
					)
			);
		return filters.length;
	}

	/** filter by archived, attention, weird logic:
	 * if shouldAdd is true we the products archived
	 * if shouldAdd is false we only see the not archived + not archived */
	filterByArchived(shouldAdd: boolean) {
		const filterParam = { type: FilterType.ARCHIVED, value: false };
		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}
		this.removeFilter(filterParam);
	}

	filterByAssignedToMe(shouldAdd: boolean) {
		const filterParam = {
			type: FilterType.ASSIGNEE,
			value: this.userSrv.userIdSync
		};
		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}
		this.removeFilter(filterParam);
	}

	/** filter by done, attention, weird logic:
	 * if shouldAdd is true we the products done
	 * if shouldAdd is false we only see the not done + not done */
	filterByDone(shouldAdd: boolean) {
		const filterParam = { type: FilterType.DONE, value: false };
		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}
		this.removeFilter(filterParam);
	}

	filterByCreatedByMe(shouldAdd: boolean) {
		const filterParam = {
			type: FilterType.CREATED_BY,
			value: this.userSrv.userIdSync
		};
		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}
		this.removeFilter(filterParam);
	}
}

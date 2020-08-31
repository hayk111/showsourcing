import { FilterService } from './filter.service';
import { Injectable } from '@angular/core';
import { FilterType } from './filter-type.enum';
import { UserService } from '~core/auth';


@Injectable({ providedIn: 'root' })
export class FilterCommonService {

	constructor(
		private filterSrv: FilterService,
		private userSrv: UserService,
	) {}


	filterByArchived(value: boolean) {
		if (value) {
			const filterParam = { type: FilterType.ARCHIVED, value };
			this.filterSrv.addFilter(filterParam);
		} else {
			this.filterSrv.removeFilterType(FilterType.ARCHIVED);
		}
	}

	filterByAssignedToMe(shouldAdd: boolean) {
		const filterParam = {
			type: FilterType.ASSIGNEE,
			value: this.userSrv.userId,
		};
		if (shouldAdd) {
			this.filterSrv.addFilter(filterParam);
		} else {
			this.filterSrv.removeFilter(filterParam);
		}
	}

	filterByDone(value: boolean) {
		if (value) {
			const filterParam = { type: FilterType.DONE, value };
			this.filterSrv.addFilter(filterParam);
		} else {
			this.filterSrv.removeFilterType(FilterType.DONE);
		}
	}

	filterByCreatedByMe(shouldAdd: boolean) {
		const filterParam = {
			type: FilterType.CREATED_BY,
			value: this.userSrv.userId
		};
		if (shouldAdd) {
			this.filterSrv.addFilter(filterParam);
			return;
		}
		this.filterSrv.removeFilter(filterParam);
	}

}

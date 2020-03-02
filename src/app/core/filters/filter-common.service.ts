import { FilterService } from './filter.service';
import { Injectable } from '@angular/core';
import { FilterType } from './filter-type.enum';
import { UserService } from '~core/erm';



@Injectable({ providedIn: 'root' })
export class FilterCommonService {

	constructor(
		private filterSrv: FilterService,
		private userSrv: UserService
	) {}


	/** filter by archived, attention, weird logic:
	 * if shouldAdd is true we the products archived
	 * if shouldAdd is false we only see the not archived + not archived */
	filterByArchived(shouldAdd: boolean) {
		const filterParam = { type: FilterType.ARCHIVED, value: false };
		if (shouldAdd) {
			this.filterSrv.addFilter(filterParam);
			return;
		}
		this.filterSrv.removeFilter(filterParam);
	}

	filterByAssignedToMe(shouldAdd: boolean) {
		const filterParam = {
			type: FilterType.ASSIGNEE,
			value: this.userSrv.userIdSync
		};
		if (shouldAdd) {
			this.filterSrv.addFilter(filterParam);
			return;
		}
		this.filterSrv.removeFilter(filterParam);
	}

	/** filter by done, attention, weird logic:
	 * if shouldAdd is true we the products done
	 * if shouldAdd is false we only see the not done + not done */
	filterByDone(shouldAdd: boolean) {
		const filterParam = { type: FilterType.DONE, value: false };
		if (shouldAdd) {
			this.filterSrv.addFilter(filterParam);
			return;
		}
		this.filterSrv.removeFilter(filterParam);
	}

	filterByCreatedByMe(shouldAdd: boolean) {
		const filterParam = {
			type: FilterType.CREATED_BY,
			value: this.userSrv.userIdSync
		};
		if (shouldAdd) {
			this.filterSrv.addFilter(filterParam);
			return;
		}
		this.filterSrv.removeFilter(filterParam);
	}

}

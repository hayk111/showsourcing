import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectParamsConfig } from '~core/erm';
import {
	Currency,
} from '~core/erm';
import { ApiService } from '~core/erm3/services/api.service';
import { ObservableQuery } from '~core/erm3';
import { DynamicField } from '~shared/dynamic-forms';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { Typename } from '~core/erm3/typename.type';

@Injectable({
	providedIn: 'root',
})
export class SelectorsService {
	queryListRef: ObservableQuery<any>;
	filterList = new FilterList([]);

	currentSearchQuery = '';

	constructor (
		private apiSrv: ApiService,
	) { }

	setFilters(filters: FilterList) {
		if (filters) {
			this.filterList = filters;
		}
	}

	loadMore() {
		// return this.queryListRef.fetchMore().subscribe();
	}

	getChoices(entityType: Typename, listBy: 'Team' | 'Owner' = 'Team', sortBy = 'name'): Observable<any[]> { // sortBy shall be added to query
		this.queryListRef = this.apiSrv.listBy(entityType, listBy);
		return this.queryListRef.data$;
	}

	create(entityType: Typename, entity: any) {
		const entityClone = Object.assign({}, entity);
		delete entityClone._deleted;
		delete entityClone._lastChangedAt;

		return this.apiSrv.create<any>(entityType, entityClone);
	}
}

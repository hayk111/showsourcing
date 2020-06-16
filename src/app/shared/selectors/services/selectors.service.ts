import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiLibService } from '~core/api-lib';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { Typename } from '~core/erm3/typename.type';

@Injectable({
	providedIn: 'root',
})
export class SelectorsService {
	queryListRef: any;

	currentSearchQuery = '';

	constructor (
		private apiLibSrv: ApiLibService,
	) { }

	loadMore() {
		// return this.queryListRef.fetchMore().subscribe();
	}

	getChoices(entityType: Typename, listBy: 'Team' | 'Owner' = 'Team', sortBy = 'name'): Observable<any[]> { // sortBy shall be added to query
		// this.queryListRef = this.apiSrv.listBy(entityType, listBy);
		this.queryListRef = this.apiLibSrv.db.find(entityType);
		return this.queryListRef.data$;
	}

	create(entityType: Typename, entity: any) {
		return this.apiLibSrv.db.create(entityType, [entity]);
	}
}

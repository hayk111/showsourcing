import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { api } from 'showsourcing-api-lib';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { Typename } from '~core/erm3/typename.type';

@Injectable({
	providedIn: 'root',
})
export class SelectorsService {
	queryListRef: any;

	currentSearchQuery = '';

	constructor () { }

	loadMore() {
		// return this.queryListRef.fetchMore().subscribe();
	}

	getChoices(entityType: Typename, listBy: 'Team' | 'Owner' = 'Team', sortBy = 'name'): Observable<any[]> { // sortBy shall be added to query
		// this.queryListRef = this.apiSrv.listBy(entityType, listBy);
		this.queryListRef = api[entityType].find();
		return this.queryListRef.data$;
	}

	create(entityType: Typename, entity: any) {
		return api[entityType].create([entity]);
	}
}

import { Injectable } from '@angular/core';
import { api, Collection } from 'lib';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkflowStatus } from '~core/erm3/models';
import { ListHelper2Service } from '~core/list-page2';


@Injectable({
	providedIn: 'root',
})
export class StatusSelectorService {
	private _entityUpdate$ = new Subject<any>();
	entityUpdate$ = this._entityUpdate$.asObservable();
	statusUpdate$ = this.entityUpdate$.pipe(map(entity => entity.status));

	private _listStatus$ = new ReplaySubject<WorkflowStatus[]>();
	listStatus$ = this._listStatus$.asObservable();
	listStatus: WorkflowStatus[];
	private collection: Collection;

	constructor(private listHelper: ListHelper2Service) {
		this.listStatus$.subscribe(statuses => {
			this.listStatus = statuses;
		});
	}

	setupStatuses(collection: Collection) {
		this.collection = collection;
		api.col('Product').statuses();
	}

	updateStatus(status: WorkflowStatus, entity?: any): Observable<any> {
		throw Error('not implemented yet');
	}

}

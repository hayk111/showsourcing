import { Injectable } from '@angular/core';
import { api, Typename } from 'showsourcing-api-lib';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { WorkflowStatus } from '~core/erm3/models';
import { ListHelper2Service } from '~core/list-page2';

@Injectable({
	providedIn: 'root',
})
export class StatusSelectorService {
	private _listStatus$ = new ReplaySubject<WorkflowStatus[]>();
	listStatus$ = this._listStatus$.asObservable();
	listStatus: WorkflowStatus[];
	private typename: Typename;

	constructor() {
		this.listStatus$.subscribe(statuses => {
			this.listStatus = statuses;
		});
	}

	setup(typename: Typename) {
		if (typename === this.typename) {
			return;
		}
		this.typename = typename;
		api.WorkflowStatus.findByType(typename.toUpperCase() as any)
			.data$.pipe(first())
			.subscribe(statuses => {
				this._listStatus$.next(statuses);
			});
	}

	updateStatus(status: WorkflowStatus, entity?: any): Observable<any> {
		return api.WorkflowStatus.updatesForType(this.typename.toUpperCase() as any, [
			{
				entityId: entity.id,
				statusId: status.id,
			},
		]);
	}
}

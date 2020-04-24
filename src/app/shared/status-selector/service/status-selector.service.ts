import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { WorkflowStatus } from '~core/erm3/models';
import { ApiService } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { ListFuseHelperService } from '~core/list-page2';

@Injectable({
	providedIn: 'root',
})
export class StatusSelectorService {
	private _statusUpdate$ = new Subject<WorkflowStatus>();
	statusUpdate$ = this._statusUpdate$.asObservable();

	private _listStatus$ = new ReplaySubject<WorkflowStatus[]>();
	listStatus$ = this._listStatus$.asObservable();

	typename: Typename;

	constructor(private fuseHelper: ListFuseHelperService, private apiSrv: ApiService) {}

	updateStatus(status: WorkflowStatus, entity?: any) {
		if (!entity?.id) return this._statusUpdate$.next(status);
		this.apiSrv
			.updateStatus(this.typename, entity.id, status.id)
			.subscribe((updatedEntity) => {
				/**  */
			});
		// TODO do this in subscribe with optimistic reponse => how to get status name ?
		this._statusUpdate$.next({...status});
	}

	updateTask(entity) {
		// this.taskSrv.update(entity).subscribe();
	}

	updateProject(entity) {
		// this.projectSrv.update(entity).subscribe();
	}

	setupStatuses(typename) {
		if (typename === this.typename) return;
		this.typename = typename;
		const statusType = typename.toUpperCase(); // PRODUCT | TASK | ...
		const statusQueryOptions = {
			variables: {
				filter: { type: { eq: statusType } },
			},
		};
		// this must be updated with the futur query lists
		this.fuseHelper.setup('WorkflowStatus', undefined, undefined, statusQueryOptions);
		this.fuseHelper.paginedItems$
			.pipe(
				first(),
				// we sort the status by step and remove spaces
				map((statuses) => {
					// ? Do we realy need this ? if yes we can do a pype for the tables
					// statuses.forEach((status) => (status.name = status.name.replace(' ', '-')));
					statuses.sort((first, second) => first.step - second.step);
					return statuses;
				})
			)
			.subscribe((statuses) => this._listStatus$.next(statuses));
	}
}

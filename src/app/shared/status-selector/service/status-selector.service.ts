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
	private _entityUpdate$ = new Subject<any>();
	entityUpdate$ = this._entityUpdate$.asObservable();
	statusUpdate$ = this.entityUpdate$.pipe(map(entity => entity.status));

	private _listStatus$ = new ReplaySubject<WorkflowStatus[]>();
	listStatus$ = this._listStatus$.asObservable();

	typename: Typename;

	constructor(private fuseHelper: ListFuseHelperService, private apiSrv: ApiService) {}

	updateStatus(status: WorkflowStatus, entity?: any) {
		const optimisticEntity = {...entity}; // ? optimistic response not working
		optimisticEntity.status = {...status};
		this.apiSrv
			.updateStatus(this.typename, entity.id, status.id , { variables: { input: { ...optimisticEntity } } } )
			.subscribe((updatedEntity) => {
				this._entityUpdate$.next(updatedEntity);
			});
		return this.entityUpdate$.pipe(first());
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

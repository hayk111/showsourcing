import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '~core/erm';
import { WorkflowStatus } from '~core/erm3/models';
import { Typename } from '~core/erm3/typename.type';
import { ListFuseHelperService } from '~core/list-page2';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { AutoUnsub, StatusUtils } from '~utils';
import { ApiService } from '~core/erm3/services/api.service';

@Component({
	selector: 'status-selector-app',
	templateUrl: './status-selector.component.html',
	styleUrls: ['./status-selector.component.scss'],
	host: {
		class: 'pointer',
	},
})
export class StatusSelectorComponent extends AutoUnsub {
	/** Its always going to be a Product | Sample | Supplier | Task */
	private _typename: Typename;
	@Input()
	public set typename(typename: Typename) {
		this._setupStatuses(typename);
		this._typename = typename;
	}
	public get typename(): Typename {
		return this._typename;
	}

	@Input() entity: any = {}; // the entity can be optional => for the mass update

	@Input() displayStep = false; // show the number before the status's name

	// use for the cdk overlay
	@Input() offsetX = 0;
	@Input() offsetY = 5;
	@Input() selectSize = 'm';
	// @Input() canUpdate = true;

	@Input() type: 'badge' | 'button' = 'badge';
	@Output() statusChanged = new EventEmitter<any>();

	@ViewChild(ContextMenuComponent, { static: false }) menu: ContextMenuComponent;

	statuses$ = new ReplaySubject<WorkflowStatus[]>();
	statusUtils = StatusUtils; // TODO adapt this for colors

	constructor(private fuseHelperSrv: ListFuseHelperService, private apiSrv: ApiService) {
		super();
	}

	updateStatus(status: Status) {
		if (this.entity?.id)
			this.apiSrv
				.updateStatus(this.typename, this.entity.id, status.id)
				// TODO change this with optimistic reponse => how to get status name ?
				.subscribe((updatedEntity) => (this.entity.status = {...status}));
		this.statusChanged.emit(status);
	}

	setStatus(status) {
		// if (this.internalUpdate) {
		// 	this.statusSlctSrv.updateStatus({
		// 		id: this.entity.id,
		// 		status: { id: status.id, __typename: status.__typename }
		// 	}, this.typename
		// 	).subscribe();
		// }
		// this.statusChanged.emit(status);
	}

	// this is only done for tasks since we don't have it on the DB
	updateTask(done: boolean) {
		// if (this.canUpdate) {
		// 	this.statusSlctSrv.updateTask({ id: this.entity.id, done });
		// 	this.statusChanged.emit(done);
		// }
	}

	updateProject(done: boolean) {
		// this.statusSlctSrv.updateProject({ id: this.entity.id, done });
	}

	isLast() {
		// if (!this.statuses) {
		// 	// if empty we return true, so it beleives its last
		// 	return false;
		// }
		// const length = this.statuses.length;
		// // minus 2 cuz we don't want the last one (refused)
		// const lastStep = this.statuses[length - 2].step;
		// return this.entity.status.step >= lastStep;
	}

	getNextStatus() {
		// const nextStep = this.entity.status.step + 1;
		// return this.statuses ? this.statuses.find((status) => status.step === nextStep) : null;
	}

	next() {
		// return this.updateStatus(this.getNextStatus());
	}

	getPreviousStatus() {
		// const previousStep = this.entity.status.step - 1;
		// return this.statuses ? this.statuses.find((status) => status.step === previousStep) : null;
	}

	previous() {
		// return this.updateStatus(this.getPreviousStatus());
	}

	private _setupStatuses(typename) {
		const statusType = typename.toUpperCase(); // PRODUCT | TASK | ...
		const statusQueryOptions = {
			variables: {
				filter: { type: { eq: statusType } },
			},
		};
		// this must be updated with the futur query lists
		this.fuseHelperSrv.setup('WorkflowStatus', undefined, undefined, statusQueryOptions);
		this.fuseHelperSrv.paginedItems$
			.pipe(
				// we sort the status by step and remove spaces
				map((statuses) => {
					statuses.forEach((status) => (status.name = status.name.replace(' ', '-')));
					statuses.sort((first, second) => first.step - second.step);
					return statuses;
				})
			)
			.subscribe((statuses) => this.statuses$.next(statuses));
	}
}

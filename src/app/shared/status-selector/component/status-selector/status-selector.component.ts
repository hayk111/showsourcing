import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '~core/erm';
import { WorkflowStatus } from '~core/erm3/models';
import { Typename } from '~core/erm3/typename.type';
import { ListFuseHelperService } from '~core/list-page2';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { AutoUnsub, StatusUtils } from '~utils';

@Component({
	selector: 'status-selector-app',
	templateUrl: './status-selector.component.html',
	styleUrls: ['./status-selector.component.scss'],
	host: {
		class: 'pointer',
	},
})
export class StatusSelectorComponent extends AutoUnsub implements OnInit {
	private _typename: Typename;
	@Input()
	public set typename(typename: Typename) {
		this._setupStatuses(typename);
		this._typename = typename;
	}
	public get typename(): Typename {
		return this._typename;
	}

	/** In this case its alwaysgoing to be a product, sample, supplier or task */
	// private _entity: any;
	@Input() entity: any;
	// public get entity(): any {
	// 	return this._entity;
	// }
	// public set entity(value: any) {
	// 	let status;
	// 	// status null with this name we use the same pipe for translation
	// 	const name = 'New-' + this.typename;
	// 	status = value?.status || {
	// 		id: StatusUtils.NEW_STATUS_ID,
	// 		category: StatusUtils.DEFAULT_STATUS_CATEGORY,
	// 		name,
	// 		step: 0,
	// 	};
	// 	this._entity = { ...value, status };
	// }

	@Input() displayStep = false;
	// use for the cdk overlay
	@Input() offsetX = 0;
	@Input() offsetY = 5;
	@Input() selectSize = 'm';
	@Input() internalUpdate = true;
	// @Input() canUpdate = true;
	@Input() type: 'badge' | 'dropdown' | 'multiple-selection' | 'button' = 'badge';
	// @Input() width: number;
	// @Input() statuses: any[];
	@Output() statusUpdated = new EventEmitter<any>();

	@ViewChild(ContextMenuComponent, { static: false }) menu: ContextMenuComponent;
	/** string[] since tasks does not have a status entity */
	statuses$ = new ReplaySubject<WorkflowStatus[]>();
	statusUtils = StatusUtils;

	constructor(private fuseHelperSrv: ListFuseHelperService) {
		super();
	}

	ngOnInit() {
		// this.status$.pipe(takeUntil(this._destroy$)).subscribe((statuses) => {
		// 	console.log('statuses : ', statuses);
		// 	this.statuses = statuses.map((status) => {
		// 		status.name = status.name.toLowerCase().replace(' ', '-');
		// 		return status;
		// 	});
		// });
	}

	updateStatus(status: Status) {
		// if (!this.internalUpdate) {
		// 	this.statusUpdated.emit(status);
		// } else if (status && status.id !== this.entity.status.id) {
		// 	// we dont update if we click the same
		// 	this.statusSlctSrv.updateStatus({
		// 		id: this.entity.id,
		// 		// if we only put the id here, the preview will have issues,
		// 		// since it will recieve 2 updated (1 with only the id and 1 with the full entity from the cache)
		// 		status
		// 	},
		// 		this.typename
		// 	).subscribe(_ => this.statusUpdated.emit(status));
		// } else { // status null
		// 	this.statusSlctSrv.updateStatus({
		// 		id: this.entity.id,
		// 		status: null
		// 	}, this.typename).subscribe(_ => this.statusUpdated.emit(null));
		// }
	}

	setStatus(status) {
		// if (this.internalUpdate) {
		// 	this.statusSlctSrv.updateStatus({
		// 		id: this.entity.id,
		// 		status: { id: status.id, __typename: status.__typename }
		// 	}, this.typename
		// 	).subscribe();
		// }
		// this.statusUpdated.emit(status);
	}

	// this is only done for tasks since we don't have it on the DB
	updateTask(done: boolean) {
		// if (this.canUpdate) {
		// 	this.statusSlctSrv.updateTask({ id: this.entity.id, done });
		// 	this.statusUpdated.emit(done);
		// }
	}

	updateProject(done: boolean) {
		// this.statusSlctSrv.updateProject({ id: this.entity.id, done });
	}

	openMenu() {
		// if (this.menu) {
		// 	this.menu.openMenu();
		// }
	}

	closeMenu() {
		// if (this.menu) {
		// 	this.menu.closeMenu();
		// }
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
				// we organise the status by step
				map((statuses) => {
					// ? should we realy clean the name like app-dev ?
					// statuses.forEach((status) => (status.name = status.name.toLowerCase().replace(' ', '-')));
					statuses.sort((first, second) => first.step - second.step);
					console.log('we return statuses ! ', statuses);
					return statuses;
				})
			)
			.subscribe((statuses) => this.statuses$.next(statuses));
	}
}

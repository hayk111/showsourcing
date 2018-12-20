import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMetadata, ERM, ProductStatus, SampleStatus, SupplierStatus } from '~models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { AutoUnsub } from '~utils';

import { StatusSelectorService } from '../service/status-selector.service';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'status-selector-app',
	templateUrl: './status-selector.component.html',
	styleUrls: ['./status-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex'
	}
})
export class StatusSelectorComponent extends AutoUnsub implements OnInit {

	@Input() typeEntity: EntityMetadata;
	/** In this case its alwaysgoing to be a Product or Supplier */
	private _entity: any;
	@Input()
	public get entity(): any {
		return this._entity;
	}
	public set entity(value: any) {
		let status;
		if (value) {
			status = value.status || { id: '-1', category: 'new', name: '_New', step: 0 };
		}
		this._entity = { ...value, status };
	}
	// use for the cdk overlay
	@Input() offsetX = 0;
	@Input() offsetY: number;
	@Input() selectSize = 'm';
	@Input() isSendToWorkFlow = false;
	@Input() internalUpdate = true;
	@Input() type = 'badge';
	@Output() statusUpdated = new EventEmitter<any>();
	@ViewChildren(ContextMenuComponent) menus: QueryList<ContextMenuComponent>;
	/** string[] since tasks does not have a status entity */
	status$: Observable<ProductStatus[] | SupplierStatus[] | SampleStatus[]>;
	statuses: any[];
	erm = ERM;

	constructor(
		private statusSlctSrv: StatusSelectorService
	) {
		super();
	}

	ngOnInit() {
		this.status$ = this.statusSlctSrv.getTableStatus(this.typeEntity);
		this.status$.pipe(takeUntil(this._destroy$))
			.subscribe(statuses => this.statuses = statuses);
	}

	updateStatus(status) {
		if (status.id !== this.entity.status.id) {
			// we dont update if we click the same
			if (this.internalUpdate) {
				this.statusSlctSrv.updateStatus({
					id: this.entity.id,
					status: { id: status.id, __typename: status.__typename }
				},
					this.typeEntity
				).subscribe();
			} else {
				this.statusUpdated.emit(status);
			}
		}
	}

	setStatus(status) {
		if (this.internalUpdate) {
			this.statusSlctSrv.updateStatus({
				id: this.entity.id,
				status: { id: status.id, __typename: status.__typename }
			}, this.typeEntity
			).subscribe();
		} else {
			this.statusUpdated.emit(status);
		}
	}

	getTaskStatus() {
		let taskStatus = 'pending';
		if (this.entity.done)
			taskStatus = 'done';
		else if (this.entity.dueDate && (new Date().getTime() >= Date.parse(this.entity.dueDate.toString())))
			taskStatus = 'overdue';
		return taskStatus;
	}

	getTaskColor() {
		let taskStatusColor = 'secondary'; // pending
		if (this.entity.done)
			taskStatusColor = 'success'; // done
		else if (this.entity.dueDate && (new Date().getTime() >= Date.parse(this.entity.dueDate.toString())))
			taskStatusColor = 'warn'; // overdue
		return taskStatusColor;
	}

	updateTask() {
		const done = !this.entity.done;
		this.statusSlctSrv.updateTask({ id: this.entity.id, done });
	}

	closeMenu() {
		if (this.menus && this.menus.length > 0) {
			const contextualMenu = this.menus.first;
			contextualMenu.closeMenu();
		}
	}

	isLast() {

		const length = this.statuses.length;
		// minus 2 cuz we don't want the last one (refused)
		const lastStep = this.statuses[length - 2].step;
		return this.entity.status.step >= lastStep;
	}

	next() {
		const nextStep = this.entity.status.step + 1;
		const next = this.statuses.find(status => status.step === nextStep);
		return this.updateStatus(next);
	}

	previous() {
		const previousStep = this.entity.status.step - 1;
		const previous = this.statuses.find(status => status.step === previousStep);
		return this.updateStatus(previous);
	}
}

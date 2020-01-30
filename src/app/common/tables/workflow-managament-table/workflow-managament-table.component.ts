import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityMetadata } from '~core/orm/models';
import { Status } from '~core/orm/models/status.model';
import { StatusCategory, StatusUtils } from '~utils';

@Component({
	selector: 'workflow-managament-table-app',
	templateUrl: './workflow-managament-table.component.html',
	styleUrls: ['./workflow-managament-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowManagamentTableComponent {

	@Input() typeEntity: EntityMetadata;
	private _statuses: Status[];
	@Input() set statuses(statuses: Status[]) {
		if (statuses) {
			// capitalize name
			const name = ('_New' + this.typeEntity.singular.charAt(0).toUpperCase() + this.typeEntity.singular.slice(1)).replace(' ', '');
			this._statuses = [{ id: StatusUtils.NEW_STATUS_ID, category: StatusUtils.DEFAULT_STATUS_CATEGORY, name, step: 0 }, ...statuses];
		}
	}
	get statuses() {
		return this._statuses;
	}
	@Output() update = new EventEmitter<Status[]>();
	@Output() delete = new EventEmitter<string>();

	categoriesContextItem = [
		StatusCategory.PREPARATION,
		StatusCategory.IN_PROGRESS,
		StatusCategory.VALIDATED,
		StatusCategory.REFUSED
	];
	statusUtils = StatusUtils;

	onDrop(event: CdkDragDrop<string[]>) {
		// index 0 cannot be changed
		const index = Math.max(event.currentIndex, 1);
		moveItemInArray(this.statuses, event.previousIndex, index);
		this.statuses.forEach((status, i) => {
			status.step = i;
		});
		this.update.emit(this.statuses);
	}

	onEditableClose(isCancel: boolean, value: string, status) {
		if (isCancel)
			return;
		status.name = value;
		this.update.emit([status]);
	}

	/** Trackby function for ngFor */
	trackByFn(index, status) {
		return status.id;
	}

	trackByCategoryFn(index, category) {
		return category.key;
	}
}

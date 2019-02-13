import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityMetadata } from '~core/models';
import { Status } from '~core/models/status.model';
import { statusCategories } from '~utils';

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
			this._statuses = [{ id: '-1', category: 'new', name, step: 0 }, ...statuses];
		}
	}
	get statuses() {
		return this._statuses;
	}
	@Output() update = new EventEmitter<Status[]>();
	@Output() delete = new EventEmitter<string>();
	categories = statusCategories;

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

	getType(status) {
		// by default is secondary since is the color for NEW elements
		if (status) {
			switch (status.category) {
				case 'inProgress':
					return 'in-progress';
				case 'validated':
					return 'success';
				case 'refused':
					return 'warn';
				case 'inspiration':
					return 'secondary-light';
				default:
					return 'secondary';
			}
		}
	}
}

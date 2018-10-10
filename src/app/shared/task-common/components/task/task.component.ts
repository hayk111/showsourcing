import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	NgModuleRef,
} from '@angular/core';
import { Task, User } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { DEFAULT_IMG } from '~utils';
import { PortalService } from '~shared/portal';
import { PickerEntitySelectorComponent } from '../picker-entity-selector/picker-entity-selector.component';

@Component({
	selector: 'task-app',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

	@Input() fullUser = false;
	@Input() task: Task;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<Task>();
	@Output() previewClicked = new EventEmitter<Task>();

	defaultImg = DEFAULT_IMG;

	constructor(
		private portalSrv: PortalService,
		private moduleRef: NgModuleRef<any>
	) { }

	get getStatus() {
		let status = 'pending';
		if (this.task.done)
			status = 'done';
		else if (this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			status = 'overdue';
		return status;
	}

	updateAssignee(user: User) {
		this.updateTask.emit({ ...this.task, assignee: user });
	}

	toggleDoneStatus() {
		const done = !this.task.done;
		this.updateTask.emit({ ...this.task, done });
	}

	openSelectorEntity(event, offsetX = 114, offsetY = 5) {
		const callback = (user) => {
			this.updateAssignee(user);
		};
		this.portalSrv.openFromModule(PickerEntitySelectorComponent, this.moduleRef, { event, callback, offsetX, offsetY });
	}
}

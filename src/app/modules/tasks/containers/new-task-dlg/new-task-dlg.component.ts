import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DialogName } from '~dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskActions } from '~store/action/entities/index';
import { Task, TaskStatus, TaskType, TaskParams } from '../../models/task.model';
import { UserService } from '~user';
import { Observable } from 'rxjs/Observable';
import { selectTaskStatuses } from '~store/selectors/entities/task-status.selector';
import {
	entityStateToArray,
	EntityState,
	entityRepresentationMap
} from '~store/utils/entities.utils';
import { map, tap } from 'rxjs/operators';
import { selectTaskTypes } from '~store/selectors/entities/task-type.selector';
import { Product } from '~products/index';
import { DialogActions } from '~dialog';

@Component({
	selector: 'new-task-dlg-app',
	templateUrl: './new-task-dlg.component.html',
	styleUrls: ['./new-task-dlg.component.scss']
})
export class NewTaskDlgComponent implements OnInit {
	@Input() productId: string;
	@Output() newTask = new EventEmitter<Task>();
	name = DialogName.NEW_TASK;
	group: FormGroup;
	g: Task;
	statusRep = entityRepresentationMap.taskStatuses;
	typeRep = entityRepresentationMap.taskTypes;
	productRep = entityRepresentationMap.product;

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService) {}

	ngOnInit() {
		this.group = this.fb.group({
			description: ['', Validators.required],
			status: ['', Validators.required],
			type: ['', Validators.required],
			productId: [this.productId, Validators.required]
		});
		this.group.reset();
	}

	onSubmit() {
		if (this.group.valid) {
			const value: TaskParams = this.group.value;
			value.userId = this.userSrv.getUserId();
			this.store.dispatch(DialogActions.close(DialogName.NEW_TASK));
			this.newTask.emit(new Task(value));
		}
	}
}

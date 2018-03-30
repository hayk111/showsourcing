import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogActions, DialogName } from '~dialog';
import { ERM } from '~entity';

import { Task, TaskParams } from '~task';
import { UserService } from '~app/features/user';

@Component({
	selector: 'new-task-dlg-app',
	templateUrl: './new-task-dlg.component.html',
	styleUrls: ['./new-task-dlg.component.scss'],
})
export class NewTaskDlgComponent implements OnInit {
	@Input() productId: string;
	@Output() newTask = new EventEmitter<Task>();
	name = DialogName.NEW_TASK;
	group: FormGroup;
	g: Task;
	statusRep = ERM.taskStatus;
	typeRep = ERM.taskType;
	productRep = ERM.product;

	constructor(
		private fb: FormBuilder,
		private store: Store<any>,
		private userSrv: UserService
	) { }

	ngOnInit() {
		this.group = this.fb.group({
			description: ['', Validators.required],
			status: ['', Validators.required],
			type: ['', Validators.required],
			productId: [this.productId, Validators.required],
		});
		this.group.reset();
	}

	onSubmit() {
		if (this.group.valid) {
			const value: TaskParams = this.group.value;
			value.userId = this.userSrv.userId;
			this.store.dispatch(DialogActions.close(DialogName.NEW_TASK));
			this.newTask.emit(new Task(value));
		}
	}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogActions } from '~dialog/store';
import { DialogName } from '~dialog/models';
import { ERM } from '~entity';

import { Task, TaskParams, fromTask } from '~task';
import { UserService } from '~app/features/user';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';


const addDlg = () => addDialog(NewTaskDlgComponent, DialogName.NEW_TASK);

@Component({
	selector: 'new-task-dlg-app',
	templateUrl: './new-task-dlg.component.html',
	styleUrls: ['./new-task-dlg.component.scss'],
})
export class NewTaskDlgComponent implements OnInit {
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
			// productId: [this.productId, Validators.required],
		});
		this.group.reset();
	}

	onSubmit() {
		if (this.group.valid) {
			const value: TaskParams = this.group.value;
			value.userId = this.userSrv.userId;
			this.store.dispatch(DialogActions.close(DialogName.NEW_TASK));
			this.store.dispatch(fromTask.Actions.create(new Task(value)));
		}
	}
}

addDlg();

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogName } from '~shared/dialog/models';

import { UserService } from '../../../../global-services';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { DialogService } from '~shared/dialog';


const addDlg = () => addDialog(NewTaskDlgComponent, DialogName.NEW_TASK);

@Component({
	selector: 'new-task-dlg-app',
	templateUrl: './new-task-dlg.component.html',
	styleUrls: ['./new-task-dlg.component.scss'],
})
export class NewTaskDlgComponent implements OnInit {
	name = DialogName.NEW_TASK;
	group: FormGroup;


	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService
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
			const value = this.group.value;
			this.dlgSrv.close(DialogName.NEW_TASK);
			// this.store.dispatch(fromTask.Actions.create(new Task(value)));
		}
	}
}

addDlg();

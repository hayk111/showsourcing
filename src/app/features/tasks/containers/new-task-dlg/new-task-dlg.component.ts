import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogService } from '~shared/dialog/services';



@Component({
	selector: 'new-task-dlg-app',
	templateUrl: './new-task-dlg.component.html',
	styleUrls: ['./new-task-dlg.component.scss'],
})
export class NewTaskDlgComponent implements OnInit {
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
			this.dlgSrv.close();
			// this.store.dispatch(fromTask.Actions.create(new Task(value)));
		}
	}
}

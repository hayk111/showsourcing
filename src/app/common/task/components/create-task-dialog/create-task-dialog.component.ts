import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog/services';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'create-task-dialog-app',
	templateUrl: './create-task-dialog.component.html',
	styleUrls: ['./create-task-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskDialogComponent extends TrackingComponent implements OnInit {

	options = ['supplier', 'product'];
	pending = false;
	group: FormGroup;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required],
			description: [''],
			dueDate: ['', Validators.required],
			assignee: ['', Validators.required],
			type: ['', Validators.required],
			product: [''],
			supplier: [''],
		});
	}

	onSubmit() {
		this.dlgSrv.close();
	}
}

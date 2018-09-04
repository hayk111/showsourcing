import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'create-task-dialog-app',
	templateUrl: './create-task-dialog.component.html',
	styleUrls: ['./create-task-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskDialogComponent implements OnInit {

	pending = false;
	group: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {

	}

}

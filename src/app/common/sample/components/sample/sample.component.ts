import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ERM, Sample, User } from '~models';

@Component({
	selector: 'sample-app',
	templateUrl: './sample.component.html',
	styleUrls: ['./sample.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent {

	@Input() sample: Sample;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() previewClicked = new EventEmitter<Sample>();
	@Output() updateSample = new EventEmitter<Sample>();

	erm = ERM;

	constructor() { }

	updateAssignee(user: User) {
		this.updateSample.emit({ ...this.sample, assignee: user });
	}
}

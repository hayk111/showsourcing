import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Sample, User } from '~models';

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

	menuOpen = false;

	constructor() { }

	updateAssignee(user: User) {
		this.updateSample.emit({ ...this.sample, assignee: user });
	}

	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}

	closeMenu() {
		this.menuOpen = false;
	}

}

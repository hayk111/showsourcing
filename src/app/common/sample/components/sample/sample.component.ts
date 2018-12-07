import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Sample, User, ERM } from '~models';

@Component({
	selector: 'sample-app',
	templateUrl: './sample.component.html',
	styleUrls: ['./sample.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent {

	@Input() sample: Sample;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() previewClicked = new EventEmitter<Sample>();
	@Output() updateSample = new EventEmitter<Sample>();

	menuOpen = false;
	erm = ERM;

	constructor() { }

	updateAssignee(user: User) {
		this.updateSample.emit({ ...this.sample, assignee: user });
		this.closeMenu();
	}

	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}

	closeMenu() {
		this.menuOpen = false;
	}

}

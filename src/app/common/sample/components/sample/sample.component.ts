import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, AfterContentChecked, ViewChild } from '@angular/core';
import { Sample, User, ERM } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

@Component({
	selector: 'sample-app',
	templateUrl: './sample.component.html',
	styleUrls: ['./sample.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent implements AfterContentChecked {

	@Input() sample: Sample;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() previewClicked = new EventEmitter<Sample>();
	@Output() updateSample = new EventEmitter<Sample>();

	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	menuOpen = false;
	erm = ERM;

	constructor() { }

	ngAfterContentChecked() {
		if (this.selector && this.menuOpen) {
			this.selector.open();
			this.selector.selector.ngSelect.updateDropdownPosition();
		}
	}

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

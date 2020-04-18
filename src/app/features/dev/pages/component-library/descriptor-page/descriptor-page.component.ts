import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { descriptorMock } from './descriptor.mock';

@Component({
	selector: 'app-descriptor-page',
	templateUrl: './descriptor-page.component.html',
	styleUrls: ['./descriptor-page.component.scss'],
})
export class DescriptorPageComponent implements OnInit {
	descriptor = descriptorMock;
	style = 'editable';
	columnAmount = 2;
	updateOn = 'change';
	properties = [
		{ name: 'color', value: JSON.stringify('#c561ef') }
	];
	update = {};
	invalidJson = false;
	showRequiredMarker = true;

	updateOnOptions = ['blur', 'change'];

	constructor() { }

	ngOnInit() {
	}

	getDescriptorString() {
		return JSON.stringify(this.descriptor, undefined, 2);
	}

	setDescriptor(value: string) {
		try {
			const parsed = JSON.parse(value);
			this.descriptor = parsed;
			this.invalidJson = false;
		} catch (e) {
			this.invalidJson = true;
		}
	}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'app-test-inputs-selectors',
	templateUrl: './test-inputs-selectors.component.html',
	styleUrls: ['./test-inputs-selectors.component.scss']
})
export class TestInputsSelectorsComponent implements OnInit {
	event: any;
	group: FormGroup;
	choices = [
		{ id: '1', name: 'first item'},
		{ id: '2', name: 'second item'},
		{ id: '3', name: 'third item'},
		{ id: '4', name: 'fourth item'}
	];

	suppliersRepr = entityRepresentationMap.suppliers;

	constructor(private fb: FormBuilder) {
		this.group = this.fb.group({
			one: ['2'],
			multi: [['2', '3']],
			oneSupplier: '',
			manySuppliers: ''
		});
	}

	patch(name, val) {
		this.group.controls[name].patchValue(val);
	}

	ngOnInit() {

	}

	onBlur(event) {
		console.log(event);
	}

	onUpdate(event) {
		this.event = { name: 'update', value: event };
	}

	onItemAdded(event) {
		this.event = { name: 'itemAdded', value: event };
	}

	onItemRemoved(event) {
		this.event = { name: 'itemRemoved', value: event };
	}

	getControl(name: string) {
		return this.group.controls[name];
	}
}

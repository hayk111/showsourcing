import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { telValidator } from '../../../../shared/inputs/validators/tel.validator';
import { urlValidator } from '../../../../shared/inputs/validators/url.validator';
import { intValidator } from '../../../../shared/inputs/validators/int.validator';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'app-test-inputs-vanilla',
	templateUrl: './test-inputs-vanilla.component.html',
	styleUrls: ['./test-inputs-vanilla.component.scss']
})
export class TestInputsVanillaComponent implements OnInit {
	textCtrl = new FormControl('ctrl', Validators.required);
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
			text: ['', Validators.required ],
			number: ['', Validators.compose([Validators.required, intValidator ] )],
			date: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			url: ['', Validators.compose([Validators.required, urlValidator])],
			tel: ['', Validators.compose([Validators.required, telValidator])],
			decimal: ['', Validators.compose([Validators.required])],
			textarea: ['', Validators.required ],
			radio: ['2', Validators.required ],
			checkbox: [['1', '2'], Validators.required ],
		});
	}

	patch(name, val) {
		this.group.controls[name].patchValue(val);
	}

	ngOnInit() {

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

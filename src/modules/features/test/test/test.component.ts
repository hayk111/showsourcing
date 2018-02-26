import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { intValidator } from '~shared/inputs/validators/int.validator';
import { telValidator } from '~shared/inputs/validators/tel.validator';
import { urlValidator } from '~shared/inputs/validators/url.validator';
import { entityRepresentationMap } from '~store/utils/entities.utils';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
	name = 'hey';
	textCtrl = new FormControl('ctrl', Validators.required);
	event: any;
	group: FormGroup;
	choices = [
		{ id: '1', name: 'first item' },
		{ id: '2', name: 'second item' },
		{ id: '3', name: 'third item' },
		{ id: '4', name: 'fourth item' },
	];

	suppliersRepr = entityRepresentationMap.suppliers;

	constructor(private fb: FormBuilder) {
		this.group = this.fb.group({
			text: ['', Validators.required],
			number: ['', Validators.compose([Validators.required, intValidator])],
			date: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			url: ['', Validators.compose([Validators.required, urlValidator])],
			tel: ['', Validators.compose([Validators.required, telValidator])],
			decimal: ['', Validators.compose([Validators.required])],
			textarea: ['', Validators.required],
			radio: ['2', Validators.required],
			checkbox: [['1', '2'], Validators.required],
			suppliers: ['910e521d-7827-475b-898f-86b320c4fc07', Validators.required],
		});
	}

	patch(name, val) {
		this.group.controls[name].patchValue(val);
	}

	ngOnInit() {}

	onBlur(event) {
		console.log(event);
	}

	onUpdate(event) {
		this.event = event;
	}

	getControl(name: string) {
		return this.group.controls[name];
	}
}

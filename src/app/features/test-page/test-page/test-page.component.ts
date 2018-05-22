import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent implements OnInit {
	currency = 'PKR';
	country = ['DZ'];
	harbour = 'Bangkok';
	incoTerm = 'FOB';
	supplier = ["b8b9726f-c14a-4921-ab06-b0803e243557"];
	category = "609cf9eb-d63f-448b-9f41-a3c5d678a5a6";
	event;
	tags = [];

	text = 'lol';

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', label: 'some label' }
	]

	constructor() { }

	ngOnInit() {
	}


	onFormCreated(form: FormGroup) {
		form.valueChanges.subscribe(d => {
			debugger;
		})
	}
}

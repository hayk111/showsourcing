import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FieldDescriptor } from '~core/erm3/models';

@Component({
	selector: 'dynamic-field-app',
	templateUrl: './dynamic-field.component.html',
	styleUrls: ['./dynamic-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFieldComponent implements OnInit {
	@Input() field: FieldDescriptor;
	@Input() fieldValue: any;

	constructor() { }

	ngOnInit() {
	}

	onInput(value: any) {

	}

	onBlur(value: any) {

	}

}

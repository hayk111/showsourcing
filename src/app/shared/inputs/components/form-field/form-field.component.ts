import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'form-field-app',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnInit {
	// whenever the * next to required field should be hidden
	@Input() hideRequiredMarker: boolean;
	@Input() hintLabel: string;
	constructor() { }

	ngOnInit() {
	}


}

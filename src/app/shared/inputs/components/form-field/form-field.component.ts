import { Component, OnInit, ChangeDetectionStrategy, Input, HostListener, ContentChild } from '@angular/core';
import { InputDirective } from '~app/shared/inputs/directives/input.directive';
import { LabelDirective } from '~app/shared/inputs/directives/label.directive';

@Component({
	selector: 'form-field-app',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnInit {
	// whenever the * next to required field should be hidden
	@Input() hideRequiredMarker: boolean;
	@ContentChild(InputDirective) input: InputDirective;
	@ContentChild(LabelDirective) label: LabelDirective;


	constructor() { }

	ngOnInit() {
		if (!this.input)
			throw Error('FormField should have an input in it with the directive inputApp');
	}


	get control() {
		return this.input.control;
	}

}

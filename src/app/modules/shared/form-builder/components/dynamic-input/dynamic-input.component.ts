import { Component, OnInit } from '@angular/core';
import { FormControlDescriptor } from '../../interfaces/form-control-descriptor.interface';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { RegexpApp } from '../../../../../utils/regexes';

@Component({
	selector: 'dynamic-input-app',
	templateUrl: './dynamic-input.component.html',
	styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {
	// descriptor that will help us creating a control
	descriptor: FormControlDescriptor;
	// control that we create
	control = new FormControl();
	// we notify the parent when the control is created
	controlCreated = new Subject<AbstractControl>();

	constructor() {
	}

	ngOnInit() {
		this.control = new FormControl('', this.createValidators());
		this.controlCreated.next(this.control);
	}

	private createValidators() {
		const validators = [];
		if (this.descriptor.required)
			validators.push(Validators.required);
		switch (this.descriptor.fieldType) {
			case 'number':
				validators.push(Validators.pattern(RegexpApp.DIGITS));
				break;
			case 'url':
				validators.push(Validators.pattern(RegexpApp.URL));
				break;
			case 'tel':
				validators.push(Validators.pattern(RegexpApp.PHONE));
				break;
		}
		return Validators.compose(validators);
	}

}

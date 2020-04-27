import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'form-field-page-app',
	templateUrl: './form-field-page.component.html',
	styleUrls: ['./form-field-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldPageComponent  {
	formCtrl1 = new FormControl('', Validators.required);
	radioChoices = [
		{ label: '10', value: true },
		{ label: '100', value: false },
		{ label: '1000', value: null}
	];
}

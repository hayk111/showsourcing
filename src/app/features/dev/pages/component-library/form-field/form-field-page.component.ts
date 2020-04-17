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
}

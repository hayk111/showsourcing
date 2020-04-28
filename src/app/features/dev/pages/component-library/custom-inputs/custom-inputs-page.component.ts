import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'custom-inputs-page-app',
	templateUrl: './custom-inputs-page.component.html',
	styleUrls: ['./custom-inputs-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputsPageComponent  {
	checkbox = true;

	packaging = {
		length: 3,
		width: 4
	};

	price = {
		currency: 'usd',
		amount: 70
	};

	radio;

	radioChoices = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false },
		{ label: 'Maybe', value: null}
	];

	priceMatrix = [];

}

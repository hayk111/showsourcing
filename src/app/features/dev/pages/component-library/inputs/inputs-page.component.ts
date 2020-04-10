import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'inputs-page-app',
	templateUrl: './inputs-page.component.html',
	styleUrls: ['./inputs-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsPageComponent  {
	checkbox = true;

	packaging = {
		length: 3,
		width: 4
	};

	price = {
		currency: 'usd',
		amount: 70
	};

}

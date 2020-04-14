import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'input-page-app',
	templateUrl: './input-page.component.html',
	styleUrls: ['./input-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPageComponent  {
	colors = ['primary', 'secondary', 'success', 'warn', 'accent', 'vibrant'];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'button-page-app',
	templateUrl: './button-page.component.html',
	styleUrls: ['./button-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPageComponent  {
	colors = ['primary', 'secondary', 'success', 'warn', 'accent', 'vibrant'];
}

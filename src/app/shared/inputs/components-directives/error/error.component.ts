import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
	selector: 'error-app',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'color-warn' }
})
export class ErrorComponent {

	constructor() { }

}

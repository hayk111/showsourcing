import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'data-management-page-app',
	template: '<router-outlet></router-outlet>',
	styleUrls: ['./data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataManagementPageComponent {

	constructor() { }

}

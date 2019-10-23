import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'data-management-page-app',
	template: '<router-outlet></router-outlet>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataManagementPageComponent {

}

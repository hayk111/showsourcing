import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'list-management-page-app',
	template: '<router-outlet></router-outlet>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListManagementPageComponent {

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListPageViewService } from '~core/list-page2';

@Component({
	selector: 'controller-table-page-app',
	templateUrl: './controller-table-page.component.html',
	styleUrls: ['./controller-table-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageViewService
	]
})
export class ControllerTablePageComponent  {
}

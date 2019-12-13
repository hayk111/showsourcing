import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListPageService } from '~core/list-page';

@Component({
	selector: 'controller-table-page-app',
	templateUrl: './controller-table-page.component.html',
	styleUrls: ['./controller-table-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ControllerListPageComponent  {
}

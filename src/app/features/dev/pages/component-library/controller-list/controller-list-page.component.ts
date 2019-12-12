import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListPageService } from '~core/list-page';

@Component({
	selector: 'controller-list-page-app',
	templateUrl: './controller-list-page.component.html',
	styleUrls: ['./controller-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ControllerListPageComponent  {
}

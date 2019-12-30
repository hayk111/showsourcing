import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListPageService } from '~core/list-page';
import { KanbanService } from '~shared/kanban/services/kanban.service';

@Component({
	selector: 'kanban-page-app',
	templateUrl: './kanban-page.component.html',
	styleUrls: ['./kanban-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		KanbanService,
		ListPageService
	]
})
export class KanbanPageComponent {

}

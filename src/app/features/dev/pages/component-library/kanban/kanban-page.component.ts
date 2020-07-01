import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { ListHelper2Service } from '~core/list-page2';

@Component({
	selector: 'kanban-page-app',
	templateUrl: './kanban-page.component.html',
	styleUrls: ['./kanban-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		KanbanService,
		ListHelper2Service
	]
})
export class KanbanPageComponent {

}

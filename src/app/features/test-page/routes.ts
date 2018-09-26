import { TestPageComponent } from '~features/test-page/test-page/test-page.component';
import { TestKanbanComponent } from '~features/test-page/test-kanban/test-kanban.component';
import { Route } from '@angular/router';


export const routes: Array<Route> = [
	{ path: '', component: TestPageComponent },
	{ path: 'kanban', component: TestKanbanComponent },
];

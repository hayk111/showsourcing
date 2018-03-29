import { AuthGuardService } from '~auth';
import { Route } from '@angular/router';
import { TasksPageComponent } from '~app/features/tasks/containers/tasks-page/tasks-page.component';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: TasksPageComponent },
];

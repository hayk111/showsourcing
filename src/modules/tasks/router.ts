import { Route } from '@angular/router';
import { TasksPageComponent } from '~tasks/containers';

export const routes: Array<Route> = [
	{
		path: 'tasks',
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: 'all', component: TasksPageComponent },
		],
	},
];

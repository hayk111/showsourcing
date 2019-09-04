import { Route } from '@angular/router';

import {
	TasksPageComponent
} from './containers';

export const routes: Array<Route> = [
	{
		path: '',
		component: TasksPageComponent
	}
];

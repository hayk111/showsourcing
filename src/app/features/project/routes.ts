import { Route } from '@angular/router';

import {
	ProjectDetailsComponent,
	ProjectProductsComponent,
	ProjectSettingsComponent,
	ProjectsPageComponent,
	ProjectWorkflowComponent,
} from './containers';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: ProjectsPageComponent },
	{
		path: 'details/:id',
		component: ProjectDetailsComponent,
		children: [
			{ path: 'products', component: ProjectProductsComponent },
			{ path: 'settings', component: ProjectSettingsComponent },
			{ path: 'workflow', component: ProjectWorkflowComponent },
			{ path: '', redirectTo: 'products', pathMatch: 'full' }
		],
	}
];


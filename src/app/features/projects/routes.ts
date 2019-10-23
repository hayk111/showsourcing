import { Route } from '@angular/router';

import {
	ProjectDetailsComponent,
	ProjectProductsComponent,
	ProjectSettingsComponent,
	ProjectsPageComponent,
	ProjectWorkflowComponent,
} from './containers/project-details';

export const routes: Array<Route> = [
	{ path: '', component: ProjectsPageComponent },
	{
		path: ':id',
		component: ProjectDetailsComponent,
		children: [
			{ path: 'products', component: ProjectProductsComponent },
			{ path: 'settings', component: ProjectSettingsComponent },
			{ path: 'workflow', component: ProjectWorkflowComponent },
			{ path: '', redirectTo: 'products', pathMatch: 'full' }
		],
	}
];


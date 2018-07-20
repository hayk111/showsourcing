import { Route } from '@angular/router';
import { ProjectDetailsComponent } from '~features/project/containers/project-details/project-details.component';
import { ProjectProductsComponent } from '~features/project/containers/project-products/project-products.component';
import { ProjectSettingsComponent } from '~features/project/containers/project-settings/project-settings.component';

import { ProjectsPageComponent } from './containers/projects-page/projects-page.component';

import { ProjectWorkflowComponent } from './containers/project-workflow/project-workflow.component';

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


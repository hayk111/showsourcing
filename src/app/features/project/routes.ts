import { Route } from '@angular/router';
import { ProjectDetailsComponent } from '~features/project/containers/project-details/project-details.component';
import { ProjectProductsComponent } from '~features/project/containers/project-products/project-products.component';
import { ProjectSettingsComponent } from '~features/project/containers/project-settings/project-settings.component';

import { ProjectsPageComponent } from './containers/projects-page/projects-page.component';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: ProjectsPageComponent },
	{
		path: 'details/:id',
		component: ProjectDetailsComponent,
		children: [
			{ path: 'product', component: ProjectProductsComponent },
			{ path: 'settings', component: ProjectSettingsComponent }
		],
	}
];


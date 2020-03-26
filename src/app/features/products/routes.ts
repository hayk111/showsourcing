import { Route } from '@angular/router';
import * as Pages from './pages';
import * as DetailsPage from './pages/details';


export const routes: Array<Route> = [
	{
		path: '',
		redirectTo: 'table'
	},
	{ path: 'table', component: Pages.TablePageComponent },
	{ path: 'card', component: Pages.CardPageComponent },
	{
		path: ':id',
		component: Pages.DetailsPageComponent,
		children: [
			{ path: '', redirectTo: 'files', pathMatch: 'full' },
			// { path: 'activity', component: DetailsPage.ActivityPageComponent },
			// { path: 'info', component: DetailsPage.InfoPageComponent },
			{ path: 'files', component: DetailsPage.FilesPageComponent },
			{ path: 'samples', component: DetailsPage.SamplesPageComponent },
			{ path: 'tasks', component: DetailsPage.TasksPageComponent },
			// { path: 'requests', component: DetailsPage.RequestsPageComponent }
		],
	},
];

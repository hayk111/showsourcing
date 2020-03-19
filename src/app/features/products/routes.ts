import { Route } from '@angular/router';
import * as Pages from './pages';



export const routes: Array<Route> = [
	{
		path: '',
		redirectTo: 'table'
	},
	{ path: 'table', component: Pages.TablePageComponent },
	{ path: 'card', component: Pages.CardPageComponent }
	// {
	// 	path: ':id',
	// 	component: DetailsPage.ProductDetailsPageComponent,
	// 	children: [
	// 		{ path: '', redirectTo: 'info', pathMatch: 'full' },
	// 		{ path: 'activity', component: DetailsPage.ActivityPageComponent },
	// 		{ path: 'info', component: DetailsPage.InfoPageComponent },
	// 		{ path: 'files', component: DetailsPage.FilesPageComponent },
	// 		{ path: 'samples', component: DetailsPage.SamplesPageComponent },
	// 		{ path: 'tasks', component: DetailsPage.TasksPageComponent },
	// 		{ path: 'requests', component: DetailsPage.RequestsPageComponent }
	// 	],
	// },
];

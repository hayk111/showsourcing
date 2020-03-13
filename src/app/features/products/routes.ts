import { Route } from '@angular/router';
import * as ListPages from './pages/products';



export const routes: Array<Route> = [
	{
		path: '',
		redirectTo: 'table'
	},
	{ path: 'table', component: ListPages.TablePageComponent },
	{ path: 'card', component: ListPages.CardPageComponent }
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

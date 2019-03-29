import { Routes } from '@angular/router';
import { RequestsPageComponent } from './containers';


export const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: RequestsPageComponent
	}
];

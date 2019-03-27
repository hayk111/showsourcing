import { Routes } from '@angular/router';
import { RequestsPageComponent } from './requests-page/requests-page.component';


export const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: RequestsPageComponent
	}
];

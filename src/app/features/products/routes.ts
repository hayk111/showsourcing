import { AuthGuardService } from '~features/auth';
import { Route } from '@angular/router';

import { CommentCtnrComponent } from './../comment/containers/comment-ctnr/comment-ctnr.component';
import { ProductGeneralInfoComponent, ProductDetailsComponent, ProductsPageComponent } from './containers';
import { TemplateComponent } from '~shared/template';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: ProductsPageComponent,
	},
	{
		path: 'details/:id',
		component: ProductDetailsComponent,
		children: [
			{ path: 'general', component: ProductGeneralInfoComponent },
			{ path: 'activity', component: CommentCtnrComponent },
		],
	},
];

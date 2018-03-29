import { AuthGuardService } from '~auth';
import { Route } from '@angular/router';

import { CommentCtnrComponent } from './../comment/containers/comment-ctnr/comment-ctnr.component';
import { ProductGeneralInfoComponent, ProductDetailsComponent, ProductsPageComponent } from './containers';
import { TemplateComponent } from '~app/shared/template';

export const routes: Array<Route> = [
	{
		path: 'product',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		canLoad: [AuthGuardService],
		component: TemplateComponent,
		children: [
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
		],
	},
];

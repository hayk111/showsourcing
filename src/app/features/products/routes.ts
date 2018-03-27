import { AuthGuardService } from '~auth';
import { Route } from '@angular/router';

import { CommentCtnrComponent } from './../comment/containers/comment-ctnr/comment-ctnr.component';
import { ProductGeneralInfoComponent, ProductDetailsComponent, ProductsPageComponent } from './containers';

export const routes: Array<Route> = [
	{
		path: 'products',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
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

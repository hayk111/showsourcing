import { Route } from '@angular/router';

import { CommentCtnrComponent } from './../comment/containers/comment-ctnr/comment-ctnr.component';
import {
	ProductGeneralInfoComponent,
	ProductPageComponent,
	ProductsPageComponent,
} from './containers';

export const routes: Array<Route> = [
	{
		path: 'products',
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{
				path: 'all',
				component: ProductsPageComponent,
			},
			{
				path: 'details/:id',
				component: ProductPageComponent,
				children: [
					{ path: 'general', component: ProductGeneralInfoComponent },
					{ path: 'activity', component: CommentCtnrComponent },
				],
			},
		],
	},
];

import { Route } from '@angular/router';

import { CommentCtnrComponent } from '~features/comment/containers/comment-ctnr/comment-ctnr.component';
import { ProductDetailsComponent, ProductGeneralInfoComponent, ProductsPageComponent } from '~features/products/containers';

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
			{ path: '', redirectTo: 'general', pathMatch: 'full' }
		],
	},
];

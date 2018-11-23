import { TestPageComponent } from '~features/test-page/test-page/test-page.component';
import { Route } from '@angular/router';
import { PreviewTestComponent } from './preview-test/preview-test.component';


export const routes: Array<Route> = [
	{
		path: '',
		component: TestPageComponent,
		children: [
			{ path: 'preview', component: PreviewTestComponent }
		]
	},
];

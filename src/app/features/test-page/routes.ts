import { TestPageComponent } from '~features/test-page/test-page/test-page.component';
import { Route } from '@angular/router';
import { PreviewTestComponent } from './preview-test/preview-test.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';


export const routes: Array<Route> = [
	{
		path: '',
		component: TestPageComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: GuidelinesComponent },
			{ path: 'preview', component: PreviewTestComponent }
		]
	},
];

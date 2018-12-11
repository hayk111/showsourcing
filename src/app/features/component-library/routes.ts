import { Route } from '@angular/router';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { SampleCardTestComponent } from './sample-card-test/sample-card-test.component';
import { SelectorTestComponent } from './selector-test/selector-test.component';


export const routes: Array<Route> = [
	{
		path: '',
		component: ComponentLibraryComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: GuidelinesComponent },
			{ path: 'preview', component: PreviewPageComponent },
			{ path: 'sample-card', component: SampleCardTestComponent },
			{ path: 'selector', component: SelectorTestComponent }
		]
	}
];

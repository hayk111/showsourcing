import { Route } from '@angular/router';
import { CardLibPageComponent } from './card-lib-page/card-lib-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { IconsLibPageComponent } from './icons-lib-page/icons-lib-page.component';
import { LoadersLibPageComponent } from './loaders-lib-page/loaders-lib-page.component';
import { BadgeLibPageComponent } from './badge-lib-page/badge-lib-page.component';


export const routes: Array<Route> = [
	{
		path: '',
		component: ComponentLibraryComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: GuidelinesComponent },
			{ path: 'loaders', component: LoadersLibPageComponent },
			{ path: 'icons', component: IconsLibPageComponent },
			{ path: 'cards', component: CardLibPageComponent },
			{ path: 'badges', component: BadgeLibPageComponent },
			// { path: 'sample-card', component: SampleCardTestComponent },
			// { path: 'preview', component: PreviewPageComponent },
			// { path: 'product-card', component: ProductCardLibraryPageComponent },
			// { path: 'selector', component: SelectorLibraryComponent },
			// { path: 'kanban', component: KanbanLibraryPageComponent },
			// { path: 'workflow-table', component: WorkflowMngmntTableLibComponent },

		]
	}
];

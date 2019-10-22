import { Route } from '@angular/router';

import { BadgePageComponent } from './pages/component-library/badge/badge-page.component';
import { CardPageComponent } from './pages/component-library/card/card-page.component';
import { ComponentLibraryComponent } from './pages/component-library/component-library-page.component';
import { GuidelinesComponent } from './pages/component-library/guidelines/guidelines-page.component';
import { IconsPageComponent } from './pages/component-library/icon/icons-page.component';
import { LoadersPageComponent } from './pages/component-library/loader/loaders-page.component';
import { PipesPageComponent } from './pages/component-library/pipes/pipes-page.component';
import { RatingPageComponent } from './pages/component-library/rating/rating-page.component';
import { TablePageComponent } from './pages/component-library/table/table-page.component';
import { CommonListsPageComponent } from './pages/component-library/common-list/common-lists-page.component';
import { ButtonPageComponent } from './pages/component-library/button/button-page.component';
import { AccordionPageComponent } from './pages/component-library/accordion/accordion-page.component';
import { PlaygroundPageComponent } from './pages/playground/playground-page.component';


export const routes: Array<Route> = [
	{
		path: 'playground',
		component: PlaygroundPageComponent

	},
	{
		path: '',
		component: ComponentLibraryComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: GuidelinesComponent },
			{ path: 'button', component: ButtonPageComponent },
			{ path: 'loader', component: LoadersPageComponent },
			{ path: 'icon', component: IconsPageComponent },
			{ path: 'card', component: CardPageComponent },
			{ path: 'badge', component: BadgePageComponent },
			{ path: 'pipes', component: PipesPageComponent },
			{ path: 'table', component: TablePageComponent },
			{ path: 'accordion', component: AccordionPageComponent },
			{ path: 'rating-star', component: RatingPageComponent },
			{ path: 'common-list', component: CommonListsPageComponent },
			// { path: 'sample-card', component: SampleCardTestComponent },
			// { path: 'preview', component: PreviewPageComponent },
			// { path: 'product-card', component: ProductCardLibraryPageComponent },
			// { path: 'selector', component: SelectorLibraryComponent },
			// { path: 'kanban', component: KanbanLibraryPageComponent },
			// { path: 'workflow-table', component: WorkflowMngmntTableLibComponent },

		]
	}
];

import { Route } from '@angular/router';

import { BadgeLibPageComponent } from './badge-lib-page/badge-lib-page.component';
import { CardLibPageComponent } from './card-lib-page/card-lib-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { IconsLibPageComponent } from './icons-lib-page/icons-lib-page.component';
import { LoadersLibPageComponent } from './loaders-lib-page/loaders-lib-page.component';
import { PipesLibPageComponent } from './pipes-lib-page/pipes-lib-page.component';
import { RatingLibraryPageComponent } from './rating-library-page/rating-library-page.component';
import { TableLibPageComponent } from './table-lib-page/table-lib-page.component';
import { CommonListsLibPageComponent } from './common-lists-lib-page/common-lists-lib-page.component';
import { ButtonLibPageComponent } from './button-lib-page/button-lib-page.component';
import { AccordionLibPageComponent } from './accordion-lib-page/accordion-lib-page.component';


export const routes: Array<Route> = [
	{
		path: '',
		component: ComponentLibraryComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: GuidelinesComponent },
			{ path: 'buttons', component: ButtonLibPageComponent },
			{ path: 'loaders', component: LoadersLibPageComponent },
			{ path: 'icons', component: IconsLibPageComponent },
			{ path: 'cards', component: CardLibPageComponent },
			{ path: 'badges', component: BadgeLibPageComponent },
			{ path: 'pipes', component: PipesLibPageComponent },
			{ path: 'table', component: TableLibPageComponent },
			{ path: 'accordion', component: AccordionLibPageComponent },
			{ path: 'rating-star', component: RatingLibraryPageComponent },
			{ path: 'common-lists', component: CommonListsLibPageComponent },
			// { path: 'sample-card', component: SampleCardTestComponent },
			// { path: 'preview', component: PreviewPageComponent },
			// { path: 'product-card', component: ProductCardLibraryPageComponent },
			// { path: 'selector', component: SelectorLibraryComponent },
			// { path: 'kanban', component: KanbanLibraryPageComponent },
			// { path: 'workflow-table', component: WorkflowMngmntTableLibComponent },

		]
	}
];

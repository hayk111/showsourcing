import { Route } from '@angular/router';
import * as Pages from './pages';


export const routes: Array<Route> = [
	{
		path: 'playground',
		component: Pages.PlaygroundPageComponent

	},
	{
		path: 'component-library',
		component: Pages.ComponentLibraryComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: Pages.GuidelinesComponent },
			{ path: 'button', component: Pages.ButtonPageComponent },
			{ path: 'loader', component: Pages.LoaderPageComponent },
			{ path: 'icon', component: Pages.IconPageComponent },
			{ path: 'card', component: Pages.CardPageComponent },
			{ path: 'badge', component: Pages.BadgePageComponent },
			{ path: 'pipes', component: Pages.PipesPageComponent },
			{ path: 'table', component: Pages.TablePageComponent },
			{ path: 'accordion', component: Pages.AccordionPageComponent },
			{ path: 'rating-star', component: Pages.RatingPageComponent },
			{ path: 'common-list', component: Pages.CommonListPageComponent },
			{ path: 'editable-container', component: Pages.EditableContainerPageComponent }
			// { path: 'sample-card', component: Pages.SampleCardTestComponent },
			// { path: 'preview', component: Pages.PreviewPageComponent },
			// { path: 'product-card', component: Pages.ProductCardLibraryPageComponent },
			// { path: 'selector', component: Pages.SelectorLibraryComponent },
			// { path: 'kanban', component: Pages.KanbanLibraryPageComponent },
			// { path: 'workflow-table', component: Pages.WorkflowMngmntTableLibComponent },
		]
	}
];

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
			{ path: 'input', component: Pages.InputPageComponent },
			{ path: 'list', component: Pages.ListComponent },
			{ path: 'card', component: Pages.CardPageComponent },
			{ path: 'badge', component: Pages.BadgePageComponent },
			{ path: 'pipes', component: Pages.PipesPageComponent },
			{ path: 'table', component: Pages.TablePageComponent },
			{ path: 'accordion', component: Pages.AccordionPageComponent },
			{ path: 'rating-star', component: Pages.RatingPageComponent },
			{ path: 'common-list', component: Pages.CommonListPageComponent },
			{ path: 'editable-container', component: Pages.EditableContainerPageComponent },
			{ path: 'colors', component: Pages.ColorsPageComponent },
			{ path: 'spacing', component: Pages.SpacingPageComponent },
			{ path: 'typography', component: Pages.TypographyPageComponent },
			{ path: 'controller-table', component: Pages.ControllerTablePageComponent },
			{ path: 'dialog', component: Pages.DialogPageComponent }
			{ path: 'selector', component: Pages.SelectorPageComponent },
			// { path: 'sample-card', component: Pages.SampleCardTestComponent },
			// { path: 'preview', component: Pages.PreviewPageComponent },
			// { path: 'product-card', component: Pages.ProductCardLibraryPageComponent },
			// { path: 'kanban', component: Pages.KanbanLibraryPageComponent },
			// { path: 'workflow-table', component: Pages.WorkflowMngmntTableLibComponent },
		]
	}
];

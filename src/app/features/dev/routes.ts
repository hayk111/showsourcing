import { Route } from '@angular/router';
import {
	PlaygroundPageComponent,
	ComponentLibraryComponent,
	GuidelinesComponent,
	ButtonPageComponent,
	LoaderPageComponent,
	IconPageComponent,
	CardPageComponent,
	BadgePageComponent,
	PipesPageComponent,
	TablePageComponent,
	AccordionPageComponent,
	RatingPageComponent,
	CommonListPageComponent
} from './pages';




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
			{ path: 'loader', component: LoaderPageComponent },
			{ path: 'icon', component: IconPageComponent },
			{ path: 'card', component: CardPageComponent },
			{ path: 'badge', component: BadgePageComponent },
			{ path: 'pipes', component: PipesPageComponent },
			{ path: 'table', component: TablePageComponent },
			{ path: 'accordion', component: AccordionPageComponent },
			{ path: 'rating-star', component: RatingPageComponent },
			{ path: 'common-list', component: CommonListPageComponent },
			// { path: 'sample-card', component: SampleCardTestComponent },
			// { path: 'preview', component: PreviewPageComponent },
			// { path: 'product-card', component: ProductCardLibraryPageComponent },
			// { path: 'selector', component: SelectorLibraryComponent },
			// { path: 'kanban', component: KanbanLibraryPageComponent },
			// { path: 'workflow-table', component: WorkflowMngmntTableLibComponent },

		]
	}
];

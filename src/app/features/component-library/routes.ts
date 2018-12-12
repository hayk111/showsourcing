import { Route } from '@angular/router';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { SampleCardTestComponent } from './sample-card-test/sample-card-test.component';
import { SelectorTestComponent } from './selector-test/selector-test.component';
import { KanbanComponent } from '~shared/kanban/components/kanban/kanban.component';
import { KanbanLibraryPageComponent } from './kanban-library-page/kanban-library-page.component';
import { ProductCardLibraryPageComponent } from './product-card-library-page/product-card-library-page.component';


export const routes: Array<Route> = [
	{
		path: '',
		component: ComponentLibraryComponent,
		children: [
			{ path: '', redirectTo: 'guidelines', pathMatch: 'full' },
			{ path: 'guidelines', component: GuidelinesComponent },
			{ path: 'preview', component: PreviewPageComponent },
			{ path: 'sample-card', component: SampleCardTestComponent },
			{ path: 'product-card', component: ProductCardLibraryPageComponent },
			{ path: 'selector', component: SelectorTestComponent },
			{ path: 'kanban', component: KanbanLibraryPageComponent }
		]
	}
];

import { Route } from '@angular/router';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { ComponentLibraryComponent } from './component-library-page/component-library-page.component';
import { SampleCardTestComponent } from './sample-card-test/sample-card-test.component';
import { KanbanLibraryPageComponent } from './kanban-library-page/kanban-library-page.component';
import { ProductCardLibraryPageComponent } from './product-card-library-page/product-card-library-page.component';
import { SelectorLibraryComponent } from './selector-library/selector-library.component';
import { WorkflowMngmntTableLibComponent } from './workflow-mngmnt-table-lib/workflow-mngmnt-table-lib.component';
import { LoadersLibPageComponent } from './loaders-lib-page/loaders-lib-page.component';


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
			{ path: 'selector', component: SelectorLibraryComponent },
			{ path: 'kanban', component: KanbanLibraryPageComponent },
			{ path: 'workflow-table', component: WorkflowMngmntTableLibComponent },
			{ path: 'loaders', component: LoadersLibPageComponent }

		]
	}
];

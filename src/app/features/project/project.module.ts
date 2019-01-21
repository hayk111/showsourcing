import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product';
import { routes } from '~features/project/routes';
import { SharedModule } from '~shared/shared.module';

import { ProjectNavComponent, ProjectProductListComponent, ProjectsListViewComponent } from './components';
import {
	ProjectDetailsComponent,
	ProjectProductsComponent,
	ProjectSettingsComponent,
	ProjectsPageComponent,
	ProjectWorkflowComponent,
} from './containers';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ProductCommonModule
	],
	declarations: [
		ProjectDetailsComponent,
		ProjectNavComponent,
		ProjectProductListComponent,
		ProjectProductsComponent,
		ProjectSettingsComponent,
		ProjectWorkflowComponent,
		ProjectsListViewComponent,
		ProjectsPageComponent,
	],
	exports: [RouterModule, ProjectsPageComponent],
	providers: []
})
export class ProjectModule { }

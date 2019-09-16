import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCommonModule } from '~common/product';
import { routes } from '~features/project/routes';
import { SharedModule } from '~shared/shared.module';

import { ProjectNavComponent } from './components';
import {
	ProjectDetailsComponent,
	ProjectProductsComponent,
	ProjectSettingsComponent,
	ProjectsPageComponent,
	ProjectWorkflowComponent,
} from './containers';
import { ProjectCommonModule } from '~common/project/project-common.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ProductCommonModule,
		ProjectCommonModule
	],
	declarations: [
		ProjectDetailsComponent,
		ProjectNavComponent,
		ProjectProductsComponent,
		ProjectSettingsComponent,
		ProjectWorkflowComponent,
		ProjectsPageComponent,
	],
	exports: [RouterModule, ProjectsPageComponent],
	providers: []
})
export class ProjectModule { }

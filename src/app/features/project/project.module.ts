import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { GridsCommonModule } from '~common/grids/grids-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
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
import { ProjectHeaderDetailsComponent } from './containers/project-header-details/project-header-details.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule,
		BoardsCommonModule,
		SelectionBarsCommonModule,
		PreviewsCommonModule,
		GridsCommonModule,
		CardsCommonModule
	],
	declarations: [
		ProjectDetailsComponent,
		ProjectNavComponent,
		ProjectProductsComponent,
		ProjectSettingsComponent,
		ProjectWorkflowComponent,
		ProjectsPageComponent,
		ProjectHeaderDetailsComponent,
	],
	exports: [RouterModule, ProjectsPageComponent],
	providers: []
})
export class ProjectModule { }

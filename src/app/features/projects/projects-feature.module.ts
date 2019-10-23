import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsCommonModule } from '~common/boards/boards-common.module';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { GridsCommonModule } from '~common/grids/grids-common.module';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { SelectionBarsCommonModule } from '~common/selection-bars/selection-bars-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/projects/routes';
import { SharedModule } from '~shared/shared.module';

import * as DetailsPage from './pages/project-details';
import * as TablePage from './pages/projects';
import { SortingMenusCommonModule } from '~common/sorting-menus/sorting-menus-common.module';

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
		CardsCommonModule,
		SortingMenusCommonModule
	],
	declarations: [
		DetailsPage.ProjectDetailsPageComponent,
		DetailsPage.ProductsPageComponent,
		DetailsPage.ProjectHeaderDetailsComponent,
		DetailsPage.SettingsPageComponent,
		DetailsPage.WorkflowPageComponent,
		TablePage.ProjectsPageComponent
	],
	exports: [],
	providers: []
})
export class ProjectsFeatureModule { }

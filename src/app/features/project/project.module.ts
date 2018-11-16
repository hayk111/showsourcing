import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { Workflow2Module } from '~features/workflow2/workflow2.module';

import { ProjectsListViewComponent } from '~features/project/components';
import { ProjectNavComponent } from '~features/project/components/project-nav/project-nav.component';
import {
	ProjectsPageComponent,
	ProjectWorkflowComponent
} from '~features/project/containers';
import { ProjectDetailsComponent } from '~features/project/containers/project-details/project-details.component';
import { ProjectProductsComponent } from '~features/project/containers/project-products/project-products.component';
import { ProjectSettingsComponent } from '~features/project/containers/project-settings/project-settings.component';
import { RatingModule } from '~shared/rating';
import { SidenavModule } from '~shared/sidenav/sidenav.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { ProjectProductListComponent } from '~features/project/components/project-product-list/project-product-list.component';
import { FileModule } from '~shared/file';
import { routes } from '~features/project/routes';
import { CustomDialogModule } from '~shared/custom-dialog';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { FiltersModule } from '~shared/filters';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { ERM_TOKEN, ERM } from '~models';
import { KanbanModule } from '~shared/kanban/kanban.module';


@NgModule({
	imports: [
		SharedModule,
		// EffectsModule.forFeature(effects),
		RouterModule.forChild(routes),
		SideMenuModule, // side nav
		TopPanelModule, // bread crumb at the top left
		SelectionBarModule, // used for when selecting an item
		TableModule, // used in list
		RatingModule,
		SidenavModule,
		BadgeModule,
		FileModule,
		Workflow2Module,
		CustomDialogModule,
		ActionBarModule,
		DialogModule,
		SearchAutocompleteModule,
		ProductCommonModule,
		WorkflowActionModule,
		FiltersModule,
		KanbanModule
	],
	declarations: [
		ProjectsPageComponent,
		ProjectWorkflowComponent,
		ProjectsListViewComponent,
		ProjectNavComponent,
		ProjectDetailsComponent,
		ProjectProductsComponent,
		ProjectSettingsComponent,
		ProjectProductListComponent
	],
	exports: [RouterModule, ProjectsPageComponent],
	providers: [
		ListPageViewService,
		ListPageDataService,
		SelectionWithFavoriteService,
		CommonDialogService,
		ProjectFeatureService,
		ProjectWorkflowFeatureService,
		{ provide: ERM_TOKEN, useValue: ERM.PROJECT }
	]
})
export class ProjectModule { }

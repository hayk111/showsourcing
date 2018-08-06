import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { WorkflowModule } from '~features/workflow/workflow.module';

import { ProjectsListViewComponent } from '~features/project/components';
import { ProjectNavComponent } from '~features/project/components/project-nav/project-nav.component';
import { ProjectsPageComponent, ProjectWorkflowComponent } from '~features/project/containers';
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
		WorkflowModule,
		CustomDialogModule,
		ActionBarModule
	],
	declarations: [
		ProjectsPageComponent,
		ProjectWorkflowComponent,
		ProjectsListViewComponent,
		ProjectNavComponent,
		ProjectDetailsComponent,
		ProjectProductsComponent,
		ProjectSettingsComponent,
		ProjectProductListComponent,
	],
	exports: [RouterModule, ProjectsPageComponent],
	providers: [
		ProjectFeatureService,
		ProjectWorkflowFeatureService
	]
})
export class ProjectModule {

}



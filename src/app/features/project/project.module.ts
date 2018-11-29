import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogCommonModule } from '~common/dialog';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProjectsListViewComponent } from '~features/project/components';
import { ProjectNavComponent } from '~features/project/components/project-nav/project-nav.component';
import {
	ProjectProductListComponent,
} from '~features/project/components/project-product-list/project-product-list.component';
import { ProjectsPageComponent, ProjectWorkflowComponent } from '~features/project/containers';
import { ProjectDetailsComponent } from '~features/project/containers/project-details/project-details.component';
import { ProjectProductsComponent } from '~features/project/containers/project-products/project-products.component';
import { ProjectSettingsComponent } from '~features/project/containers/project-settings/project-settings.component';
import { routes } from '~features/project/routes';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ProjectWorkflowFeatureService } from '~features/project/services/project-workflow-feature.service';
import { Workflow2Module } from '~features/workflow2/workflow2.module';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { KanbanModule } from '~shared/kanban/kanban.module';
import { RatingModule } from '~shared/rating';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { SideMenuModule } from '~shared/side-menu/side-menu.module';
import { SidenavModule } from '~shared/sidenav/sidenav.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';


@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		DialogCommonModule,
		ProductCommonModule,
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
		ProjectFeatureService,
		ProjectWorkflowFeatureService
	]
})
export class ProjectModule { }

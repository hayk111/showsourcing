import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogCommonModule } from '~common/dialog';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductElementModule } from '~common/product/product-elements-module';
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
import { SharedModule } from '~shared/shared.module';
import { FindProductsDialogComponent } from '~common/product';


@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		ProductCommonModule,
		ProductElementModule
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
	],
	entryComponents: []
})
export class ProjectModule { }

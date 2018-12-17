import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ProductCommonModule,
		ProductCommonModule
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
	providers: []
})
export class ProjectModule { }

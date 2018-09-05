import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { routes } from '~features/workspace/routes';
import { ProductsReviewCardViewComponent, ProductsReviewSortingMenuComponent } from '~features/workspace/components';
import { WorkspaceComponent, MyProductsPageComponent, MyTasksPageComponent, ReviewPageComponent } from '~features/workspace/containers';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { SelectionBarModule } from '~shared/selection-bar';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { WorkflowModule } from '~features/workflow/workflow.module';
import { TaskModule } from '~shared/task';
import { ProductCommonModule } from '~shared/product-common/product-common.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		TopPanelModule,
		SelectionBarModule,
		ActionBarModule,
		WorkflowModule,
		TaskModule,
		ProductCommonModule
	],
	declarations: [
		WorkspaceComponent,
		MyProductsPageComponent,
		MyTasksPageComponent,
		ReviewPageComponent,
		ProductsReviewCardViewComponent,
		ProductsReviewSortingMenuComponent
	],
	exports: [RouterModule],
	providers: [
		WorkspaceFeatureService
	]
})
export class WorkspaceModule {

}


